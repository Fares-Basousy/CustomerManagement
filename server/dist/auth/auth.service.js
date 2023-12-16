"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwt, prisma, config) {
        this.jwt = jwt;
        this.prisma = prisma;
        this.config = config;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        const createdUser = this.prisma.user.create({
            data: {
                name: dto.name.toLocaleLowerCase(),
                password: hash,
                email: dto.email.toLocaleLowerCase(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                count: true
            }
        });
        return createdUser;
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({ where: {
                email: dto.email.toLocaleLowerCase(),
            }
        });
        if (user == null)
            throw new common_1.ForbiddenException('Credentionals incorrect');
        const ps = await argon.verify(user.password, dto.password);
        if (!ps)
            throw new common_1.ForbiddenException('Incorrect password');
        return this.signinToken(user.id, user.email, user.name, user.count);
    }
    async signinToken(id, email, name, count) {
        const secret = this.config.get('jwtPass');
        const payloud = { sub: id, email, name, count };
        const token = await this.jwt.signAsync(payloud, {
            expiresIn: `1d`,
            secret: secret,
        });
        return { access_token: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map