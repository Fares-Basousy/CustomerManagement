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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(customer) {
        const exist = await this.prisma.customer.findFirst({
            where: {
                OR: [
                    { email: customer.email.toLocaleLowerCase() },
                    { phone: customer.phone }
                ]
            }
        });
        if (exist != null)
            throw new common_1.ForbiddenException('This customer is already registered');
        const createdCustomer = await this.prisma.customer.create({
            data: {
                name: customer.name.toLocaleLowerCase(),
                email: customer.email.toLocaleLowerCase(),
                phone: customer.phone,
                gender: customer.gender,
                userId: customer.userId,
                status: customer.status,
                note: customer.note,
                country: customer.country,
                city: customer.city,
                address: customer.address,
            },
        });
        await this.prisma.user.update({
            where: {
                id: customer.userId
            },
            data: {
                count: {
                    increment: 1
                }
            }
        });
        return createdCustomer;
    }
    async delete(userId, id) {
        try {
            await this.prisma.customer.delete({ where: {
                    id: id,
                    userId: userId
                } });
        }
        catch (error) {
            throw new common_1.ForbiddenException('This customer does not exist');
        }
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                count: {
                    decrement: 1
                }
            }
        });
        return { statusCode: 200, status: 'deleted' };
    }
    async modify(newData) {
        const modified = await this.prisma.customer.update({
            where: {
                id: newData.id,
                userId: newData.userId
            },
            data: newData
        });
        return modified;
    }
    async getall(id, page) {
        const customers = await this.prisma.customer.findMany({
            skip: page * 10,
            take: 10,
            where: { userId: id },
            select: {
                name: true,
                gender: true,
                status: true,
                id: true,
                email: true,
                phone: true,
                country: true,
                city: true,
                address: true,
                note: true,
            }
        });
        const count = await this.prisma.user.findUnique({ where: { id: id }, select: { count: true } });
        return { customer: customers, count: count.count };
    }
    async lookup(userId, query) {
        const results = this.prisma.customer.findMany({
            where: {
                userId: userId,
                OR: [
                    { id: query },
                    { email: { search: query.toLocaleLowerCase() } },
                    { name: { search: query.toLocaleLowerCase() } },
                    { phone: { search: query } }
                ]
            },
            select: {
                name: true,
                gender: true,
                status: true,
                id: true,
                email: true,
                phone: true,
                country: true,
                city: true,
                address: true,
                note: true,
            }
        });
        return results;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map