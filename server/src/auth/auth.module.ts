import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports:[JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService,ConfigService]
})
export class AuthModule {}

