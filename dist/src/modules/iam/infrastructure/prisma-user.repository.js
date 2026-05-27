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
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const user_entity_1 = require("../domain/user.entity");
let PrismaUserRepository = class PrismaUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const row = await this.prisma.user.findUnique({ where: { id, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async findByClerkId(clerkUserId) {
        const row = await this.prisma.user.findUnique({ where: { clerkUserId } });
        return row ? this.toDomain(row) : null;
    }
    async save(user) {
        const row = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
                role: user.role,
                status: user.status,
            },
        });
        return this.toDomain(row);
    }
    async list(params) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where: { deletedAt: null },
                skip: params.skip ?? 0,
                take: params.take ?? 20,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count({ where: { deletedAt: null } }),
        ]);
        return { items: rows.map((r) => this.toDomain(r)), total };
    }
    toDomain(row) {
        return user_entity_1.User.rehydrate({
            id: row.id,
            clerkUserId: row.clerkUserId,
            username: row.username,
            email: row.email,
            firstName: row.firstName,
            lastName: row.lastName,
            avatarUrl: row.avatarUrl,
            role: row.role,
            status: row.status,
            tenantId: row.tenantId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map