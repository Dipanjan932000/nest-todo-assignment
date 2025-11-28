import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET') || 'secretKey',
        });
    }

    async validate(payload: any) {
        // payload.sub is userId
        const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user) return null;
        const { password, ...rest } = user as any;
        return rest; // attaches to req.user
    }
}
