import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getGeneral() {
    return { message: 'TODO: implement getGeneral settings' };
  }

  async updateGeneral(body: any) {
    return { message: 'TODO: implement updateGeneral settings' };
  }

  async getSms() {
    return { message: 'TODO: implement getSms settings' };
  }

  async updateSms(body: any) {
    return { message: 'TODO: implement updateSms settings' };
  }

  async getVoip() {
    return { message: 'TODO: implement getVoip settings' };
  }

  async updateVoip(body: any) {
    return { message: 'TODO: implement updateVoip settings' };
  }
}
