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
exports.PrismaProviderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const provider_entity_1 = require("../domain/provider.entity");
let PrismaProviderRepository = class PrismaProviderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(props) {
        const row = await this.prisma.provider.create({
            data: {
                name: props.name,
                taxId: props.taxId ?? null,
                contactName: props.contactName ?? null,
                phone: props.phone ?? null,
                email: props.email ?? null,
                address: props.address ?? null,
                serviceType: props.serviceType,
                notes: props.notes ?? null,
                tenantId: props.tenantId ?? null,
            },
        });
        return this.toDomain(row);
    }
    async findById(id) {
        const row = await this.prisma.provider.findFirst({ where: { id, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async findByTaxId(taxId) {
        const row = await this.prisma.provider.findFirst({ where: { taxId, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async list(query) {
        const where = {
            deletedAt: null,
            ...(query.serviceType ? { serviceType: query.serviceType } : {}),
            ...(query.active !== undefined ? { active: query.active } : {}),
            ...(query.search
                ? {
                    OR: [
                        { name: { contains: query.search, mode: 'insensitive' } },
                        { taxId: { contains: query.search, mode: 'insensitive' } },
                        { contactName: { contains: query.search, mode: 'insensitive' } },
                    ],
                }
                : {}),
        };
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.provider.findMany({
                where,
                skip: query.skip ?? 0,
                take: query.take ?? 20,
                orderBy: [{ active: 'desc' }, { name: 'asc' }],
            }),
            this.prisma.provider.count({ where }),
        ]);
        return { items: rows.map((r) => this.toDomain(r)), total };
    }
    async save(provider) {
        const row = await this.prisma.provider.update({
            where: { id: provider.id },
            data: {
                name: provider.name,
                taxId: provider.taxId,
                contactName: provider.contactName,
                phone: provider.phone,
                email: provider.email,
                address: provider.address,
                serviceType: provider.serviceType,
                notes: provider.notes,
                active: provider.active,
            },
        });
        return this.toDomain(row);
    }
    async softDelete(id) {
        await this.prisma.provider.update({ where: { id }, data: { deletedAt: new Date() } });
    }
    toDomain(row) {
        return provider_entity_1.Provider.rehydrate({
            id: row.id,
            name: row.name,
            taxId: row.taxId,
            contactName: row.contactName,
            phone: row.phone,
            email: row.email,
            address: row.address,
            serviceType: row.serviceType,
            notes: row.notes,
            active: row.active,
            tenantId: row.tenantId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }
};
exports.PrismaProviderRepository = PrismaProviderRepository;
exports.PrismaProviderRepository = PrismaProviderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProviderRepository);
//# sourceMappingURL=prisma-provider.repository.js.map