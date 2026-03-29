import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(branchId: number) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const [
      activeLeads,
      activeStudents,
      totalGroups,
      debtors,
      trialStudents,
      paidThisMonth,
      leftActiveGroup,
      leftAfterTrial,
    ] = await Promise.all([
      // Active leads: status != converted (all leads in Lead table have status LEAD/EXPECTATION/SET)
      this.prisma.lead.count({
        where: { branchId },
      }),

      // Active students: not archived, has at least one active group enrollment
      this.prisma.student.count({
        where: {
          branchId,
          isArchived: false,
          groupEnrollments: {
            some: { status: 'ACTIVE' },
          },
        },
      }),

      // Total active groups
      this.prisma.group.count({
        where: { branchId, status: 'ACTIVE' },
      }),

      // Debtors: students with negative balance
      this.prisma.student.count({
        where: {
          branchId,
          balance: { lt: 0 },
        },
      }),

      // Trial students
      this.prisma.groupStudent.count({
        where: {
          status: 'TRIAL',
          group: { branchId },
        },
      }),

      // Paid this month
      this.prisma.payment.count({
        where: {
          branchId,
          date: { gte: startOfMonth, lte: endOfMonth },
        },
      }),

      // Left active group this month
      this.prisma.groupStudent.count({
        where: {
          status: 'LEFT',
          group: { branchId },
          endDate: { gte: startOfMonth, lte: endOfMonth },
        },
      }),

      // Left after trial: status LEFT and was previously TRIAL (approximate: LEFT with startDate close to endDate)
      this.prisma.groupStudent.count({
        where: {
          status: 'LEFT',
          group: { branchId },
          endDate: { gte: startOfMonth, lte: endOfMonth },
          // Approximate: those who were in group less than 14 days
          createdAt: { gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

    return {
      activeLeads,
      activeStudents,
      totalGroups,
      debtors,
      trialStudents,
      paidThisMonth,
      leftActiveGroup,
      leftAfterTrial,
    };
  }

  async getRevenueChart(branchId: number, months = 12) {
    const result: { month: string; revenue: number }[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

      const agg = await this.prisma.payment.aggregate({
        where: {
          branchId,
          date: { gte: startOfMonth, lte: endOfMonth },
        },
        _sum: { amount: true },
      });

      const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      result.push({
        month: monthStr,
        revenue: Number(agg._sum.amount || 0),
      });
    }

    return result;
  }

  async getConversionReport(
    branchId: number,
    startDate?: string,
    endDate?: string,
    source?: string,
    staffId?: number,
  ) {
    const where: any = { branchId };
    if (startDate) where.createdAt = { ...(where.createdAt || {}), gte: new Date(startDate) };
    if (endDate) where.createdAt = { ...(where.createdAt || {}), lte: new Date(endDate) };
    if (source) where.source = source;
    if (staffId) where.assignedToId = staffId;

    const [incoming, waiting, set, paid] = await Promise.all([
      this.prisma.lead.count({ where }),
      this.prisma.lead.count({ where: { ...where, status: 'EXPECTATION' } }),
      this.prisma.lead.count({ where: { ...where, status: 'SET' } }),
      this.prisma.lead.count({
        where: {
          ...where,
          student: { isNot: null },
        },
      }),
    ]);

    // Attended: leads that have a student with at least one attendance record
    const attended = await this.prisma.lead.count({
      where: {
        ...where,
        student: {
          attendances: { some: {} },
        },
      },
    });

    return {
      incoming,
      waiting,
      set,
      attended,
      paid,
      rates: {
        waitingRate: incoming ? Math.round((waiting / incoming) * 100) : 0,
        setRate: incoming ? Math.round((set / incoming) * 100) : 0,
        attendedRate: incoming ? Math.round((attended / incoming) * 100) : 0,
        paidRate: incoming ? Math.round((paid / incoming) * 100) : 0,
      },
    };
  }

  async getStudentsLeft(branchId: number) {
    const records = await this.prisma.groupStudent.findMany({
      where: {
        status: 'LEFT',
        group: { branchId },
      },
      include: {
        student: {
          include: {
            user: { select: { firstName: true, lastName: true, phone: true } },
          },
        },
        group: { select: { id: true, name: true } },
      },
      orderBy: { endDate: 'desc' },
      take: 100,
    });

    return records.map((r) => ({
      id: r.id,
      studentName: `${r.student.user.firstName} ${r.student.user.lastName || ''}`.trim(),
      phone: r.student.user.phone,
      groupName: r.group.name,
      groupId: r.group.id,
      startDate: r.startDate,
      endDate: r.endDate,
    }));
  }

  async getLogs(branchId: number, page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.log.findMany({
        include: {
          user: { select: { firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.log.count(),
    ]);

    return {
      data: data.map((l) => ({
        id: l.id,
        userName: `${l.user.firstName} ${l.user.lastName}`,
        action: l.action,
        entity: l.entity,
        entityId: l.entityId,
        details: l.details,
        createdAt: l.createdAt,
      })),
      total,
      page,
      limit,
    };
  }

  async getConversion() {
    return { message: 'Use GET /reports/conversion with query params' };
  }

  async getAttendance() {
    return { message: 'TODO: implement getAttendance report' };
  }

  async getLeads() {
    return { message: 'TODO: implement getLeads report' };
  }
}
