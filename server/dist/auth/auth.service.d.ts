import { AuthDto } from './dto/Auth.dto';
import { ConfigService } from '@nestjs/config';
import { SigninAuthDto } from './dto/Auth.signin.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwt;
    private prisma;
    private config;
    constructor(jwt: JwtService, prisma: PrismaService, config: ConfigService);
    signup(dto: AuthDto): Promise<{
        id: string;
        name: string;
        email: string;
        count: number;
    }>;
    signin(dto: SigninAuthDto): Promise<{
        access_token: string;
    }>;
    signinToken(id: string, email: string, name: string, count: number): Promise<{
        access_token: string;
    }>;
}
