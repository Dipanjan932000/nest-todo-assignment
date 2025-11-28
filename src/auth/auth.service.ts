import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(data: RegisterDto) {
        // check if user exists
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing) {
            throw new ConflictException('Email already registered');
        }
        const saltRounds = 10;
        const hashed = await bcrypt.hash(data.password, saltRounds);
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashed,
            },
        });
        // strip password before return
        const { password, ...rest } = user as any;
        return rest;
    }

    async validateUser(email: string, plainPassword: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const match = await bcrypt.compare(plainPassword, user.password);
        if (!match) return null;
        const { password, ...rest } = user as any;
        return rest;
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const match = await bcrypt.compare(dto.password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        const { password, ...rest } = user as any;
        return { access_token: token, user: rest };
    }
}
