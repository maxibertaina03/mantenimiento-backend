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
exports.PrismaMaintenanceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const maintenance_order_entity_1 = require("../domain/maintenance-order.entity");
let PrismaMaintenanceRepository = class PrismaMaintenanceRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(props) {
        const row = await this.prisma.maintenanceOrder.create({
            data: {
                machineId: props.machineId,
                type: props.type,
                location: props.location,
                externalLocation: props.externalLocation ?? null,
                scheduledFor: props.scheduledFor ?? null,
                technicianId: props.technicianId ?? null,
                providerId: props.providerId ?? null,
                description: props.description ?? null,
                tenantId: props.tenantId ?? null,
            },
        });
        return this.toDomain(row);
    }
    async findById(id) {
        const row = await this.prisma.maintenanceOrder.findFirst({
            where: { id, deletedAt: null },
        });
        return row ? this.toDomain(row) : null;
    }
    async list(query) {
        const where = {
            deletedAt: null,
            ...(query.machineId ? { machineId: query.machineId } : {}),
            ...(query.status ? { status: query.status } : {}),
            ...(query.type ? { type: query.type } : {}),
            ...(query.technicianId ? { technicianId: query.technicianId } : {}),
            ...(query.providerId ? { providerId: query.providerId } : {}),
            ...(query.scheduledFrom || query.scheduledTo
                ? {
                    scheduledFor: {
                        ...(query.scheduledFrom ? { gte: query.scheduledFrom } : {}),
                        ...(query.scheduledTo ? { lte: query.scheduledTo } : {}),
                    },
                }
                : {}),
        };
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.maintenanceOrder.findMany({
                where,
                skip: query.skip ?? 0,
                take: query.take ?? 20,
                orderBy: [{ status: 'asc' }, { scheduledFor: 'asc' }, { createdAt: 'desc' }],
            }),
            this.prisma.maintenanceOrder.count({ where }),
        ]);
        return { items: rows.map((r) => this.toDomain(r)), total };
    }
    async save(order) {
        const row = await this.prisma.maintenanceOrder.update({
            where: { id: order.id },
            data: {
                status: order.status,
                location: order.location,
                externalLocation: order.externalLocation,
                scheduledFor: order.scheduledFor,
                startedAt: order.startedAt,
                completedAt: order.completedAt,
                machineHoursSnapshot: order.machineHoursSnapshot?.toString() ?? null,
                technicianId: order.technicianId,
                providerId: order.providerId,
                cost: order.cost?.toString() ?? null,
                currency: order.currency,
                description: order.description,
                observations: order.observations,
            },
        });
        return this.toDomain(row);
    }
    async softDelete(id) {
        await this.prisma.maintenanceOrder.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async countPending(tenantId) {
        return this.prisma.maintenanceOrder.count({
            where: {
                deletedAt: null,
                status: { in: ['SCHEDULED', 'IN_PROGRESS'] },
                ...(tenantId !== undefined ? { tenantId } : {}),
            },
        });
    }
    toDomain(row) {
        return maintenance_order_entity_1.MaintenanceOrder.rehydrate({
            id: row.id,
            machineId: row.machineId,
            type: row.type,
            status: row.status,
            location: row.location,
            externalLocation: row.externalLocation,
            scheduledFor: row.scheduledFor,
            startedAt: row.startedAt,
            completedAt: row.completedAt,
            machineHoursSnapshot: row.machineHoursSnapshot,
            technicianId: row.technicianId,
            providerId: row.providerId,
            cost: row.cost,
            currency: row.currency,
            description: row.description,
            observations: row.observations,
            tenantId: row.tenantId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }
};
exports.PrismaMaintenanceRepository = PrismaMaintenanceRepository;
exports.PrismaMaintenanceRepository = PrismaMaintenanceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaMaintenanceRepository);
//# sourceMappingURL=prisma-maintenance.repository.js.map