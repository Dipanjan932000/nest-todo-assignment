import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findById(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) return null;
        const { password, ...rest } = user as any;
        return rest;
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const { password, ...rest } = user as any;
        return rest;
    }
}
