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
exports.PrismaMaterialRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const material_entity_1 = require("../domain/material.entity");
let PrismaMaterialRepository = class PrismaMaterialRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(props) {
        const row = await this.prisma.material.create({
            data: {
                code: props.code,
                name: props.name,
                description: props.description ?? null,
                unit: props.unit,
                stock: props.initialStock ?? '0',
                minStock: props.minStock ?? '0',
                location: props.location ?? null,
                tenantId: props.tenantId ?? null,
            },
        });
        return this.toDomain(row);
    }
    async findById(id) {
        const row = await this.prisma.material.findFirst({ where: { id, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async findByCode(code) {
        const row = await this.prisma.material.findFirst({ where: { code, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async list(query) {
        const where = {
            deletedAt: null,
            ...(query.search
                ? {
                    OR: [
                        { code: { contains: query.search, mode: 'insensitive' } },
                        { name: { contains: query.search, mode: 'insensitive' } },
                    ],
                }
                : {}),
        };
        if (query.lowStockOnly) {
            const rows = await this.prisma.$queryRaw `
        SELECT * FROM materials
        WHERE deleted_at IS NULL
          AND min_stock > 0
          AND stock < min_stock
        ORDER BY name ASC
        LIMIT ${query.take ?? 50}
      `;
            return { items: rows.map((r) => this.toDomain(r)), total: rows.length };
        }
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.material.findMany({
                where,
                skip: query.skip ?? 0,
                take: query.take ?? 20,
                orderBy: { name: 'asc' },
            }),
            this.prisma.material.count({ where }),
        ]);
        return { items: rows.map((r) => this.toDomain(r)), total };
    }
    async save(material) {
        const row = await this.prisma.material.update({
            where: { id: material.id },
            data: {
                name: material.name,
                description: material.description,
                unit: material.unit,
                minStock: material.minStock.toString(),
                location: material.location,
            },
        });
        return this.toDomain(row);
    }
    async softDelete(id) {
        await this.prisma.material.update({ where: { id }, data: { deletedAt: new Date() } });
    }
    async persistMovement(material, movement) {
        return this.prisma.$transaction(async (tx) => {
            const locked = await tx.$queryRaw `
        SELECT stock FROM materials WHERE id = ${material.id}::uuid FOR UPDATE
      `;
            if (locked.length === 0) {
                throw new domain_exception_1.ConflictError('MATERIAL_VANISHED', 'El material no existe (lock)');
            }
            const currentStock = new client_1.Prisma.Decimal(locked[0].stock.toString());
            if (!currentStock.equals(movement.applied.stockBefore)) {
                throw new domain_exception_1.ConflictError('STOCK_CHANGED', 'El stock del material cambió antes de aplicar el movimiento. Reintentar.', {
                    expected: movement.applied.stockBefore.toString(),
                    actual: currentStock.toString(),
                });
            }
            const newStock = movement.applied.stockAfter;
            await tx.material.update({
                where: { id: material.id },
                data: { stock: newStock.toString() },
            });
            return tx.stockMovement.create({
                data: {
                    materialId: material.id,
                    type: movement.applied.type,
                    quantity: movement.applied.quantity.toString(),
                    stockAfter: newStock.toString(),
                    reason: movement.reason ?? null,
                    reference: movement.reference ?? null,
                    createdById: movement.createdById,
                    tenantId: movement.tenantId ?? null,
                },
            });
        });
    }
    async listMovements(materialId, skip = 0, take = 20) {
        return this.prisma.stockMovement.findMany({
            where: { materialId },
            orderBy: { createdAt: 'desc' },
            skip,
            take,
        });
    }
    async countLowStock(tenantId) {
        const rows = await this.prisma.$queryRaw `
      SELECT COUNT(*)::bigint AS count FROM materials
      WHERE deleted_at IS NULL
        AND min_stock > 0
        AND stock < min_stock
        ${tenantId !== undefined && tenantId !== null
            ? client_1.Prisma.sql `AND tenant_id = ${tenantId}::uuid`
            : client_1.Prisma.empty}
    `;
        return Number(rows[0]?.count ?? 0);
    }
    toDomain(row) {
        return material_entity_1.Material.rehydrate({
            id: row.id,
            code: row.code,
            name: row.name,
            description: row.description,
            unit: row.unit,
            stock: row.stock,
            minStock: row.minStock,
            location: row.location,
            tenantId: row.tenantId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }
};
exports.PrismaMaterialRepository = PrismaMaterialRepository;
exports.PrismaMaterialRepository = PrismaMaterialRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaMaterialRepository);
//# sourceMappingURL=prisma-material.repository.js.map