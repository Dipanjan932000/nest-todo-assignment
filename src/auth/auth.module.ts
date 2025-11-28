import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import * as bcrypt from 'bcrypt';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET') || 'secretKey',
                signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') || '3600s' },
            }),
            inject: [ConfigService],
        }),
        UsersModule,
    ],
    providers: [AuthService, PrismaService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }
