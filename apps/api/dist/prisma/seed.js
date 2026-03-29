"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const branch = await prisma.branch.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Main Branch',
            address: 'Tashkent',
            phone: '+998901234567',
        },
    });
    console.log('Branch created:', branch.name);
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const ceoUser = await prisma.user.upsert({
        where: { phone: '+998900000000' },
        update: {},
        create: {
            firstName: 'Admin',
            lastName: 'CEO',
            phone: '+998900000000',
            password: hashedPassword,
            role: 'CEO',
        },
    });
    console.log('CEO user created:', ceoUser.firstName, ceoUser.lastName);
    await prisma.userBranch.upsert({
        where: {
            userId_branchId: {
                userId: ceoUser.id,
                branchId: branch.id,
            },
        },
        update: {},
        create: {
            userId: ceoUser.id,
            branchId: branch.id,
        },
    });
    console.log('CEO linked to branch');
    const room1 = await prisma.room.upsert({
        where: { id: 1 },
        update: {},
        create: {
            branchId: branch.id,
            name: 'Room 1',
            capacity: 20,
        },
    });
    const room2 = await prisma.room.upsert({
        where: { id: 2 },
        update: {},
        create: {
            branchId: branch.id,
            name: 'Room 2',
            capacity: 15,
        },
    });
    console.log('Rooms created:', room1.name, room2.name);
    const course = await prisma.course.upsert({
        where: { id: 1 },
        update: {},
        create: {
            branchId: branch.id,
            name: 'English',
            price: 500000,
        },
    });
    console.log('Course created:', course.name);
    console.log('Seed completed successfully!');
}
main()
    .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map