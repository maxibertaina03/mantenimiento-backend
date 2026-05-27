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
exports.PrismaMachineRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const machine_entity_1 = require("../domain/machine.entity");
let PrismaMachineRepository = class PrismaMachineRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(props) {
        const row = await this.prisma.machine.create({
            data: {
                code: props.code,
                name: props.name,
                brand: props.brand ?? null,
                model: props.model ?? null,
                serialNumber: props.serialNumber ?? null,
                status: props.status ?? 'OPERATIONAL',
                usageHours: props.usageHours ?? '0',
                location: props.location ?? null,
                responsibleId: props.responsibleId ?? null,
                notes: props.notes ?? null,
                preventiveIntervalHours: props.preventiveIntervalHours ?? null,
                tenantId: props.tenantId ?? null,
            },
        });
        return this.toDomain(row);
    }
    async findById(id) {
        const row = await this.prisma.machine.findFirst({ where: { id, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async findByCode(code) {
        const row = await this.prisma.machine.findFirst({ where: { code, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async list(query) {
        const where = {
            deletedAt: null,
            ...(query.status ? { status: query.status } : {}),
            ...(query.responsibleId ? { responsibleId: query.responsibleId } : {}),
            ...(query.search
                ? {
                    OR: [
                        { code: { contains: query.search, mode: 'insensitive' } },
                        { name: { contains: query.search, mode: 'insensitive' } },
                        { serialNumber: { contains: query.search, mode: 'insensitive' } },
                    ],
                }
                : {}),
        };
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.machine.findMany({
                where,
                skip: query.skip ?? 0,
                take: query.take ?? 20,
                orderBy: [{ status: 'asc' }, { name: 'asc' }],
            }),
            this.prisma.machine.count({ where }),
        ]);
        return { items: rows.map((r) => this.toDomain(r)), total };
    }
    async save(machine) {
        const row = await this.prisma.machine.update({
            where: { id: machine.id },
            data: {
                name: machine.name,
                brand: machine.brand,
                model: machine.model,
                serialNumber: machine.serialNumber,
                status: machine.status,
                usageHours: machine.usageHours.toString(),
                location: machine.location,
                responsibleId: machine.responsibleId,
                notes: machine.notes,
                preventiveIntervalHours: machine.preventive.intervalHours?.toString() ?? null,
                lastPreventiveAtHours: machine.preventive.lastDoneAtHours?.toString() ?? null,
            },
        });
        return this.toDomain(row);
    }
    async softDelete(id) {
        await this.prisma.machine.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async logUsageAndSave(machine, log) {
        const [, created] = await this.prisma.$transaction([
            this.prisma.machine.update({
                where: { id: machine.id },
                data: { usageHours: machine.usageHours.toString() },
            }),
            this.prisma.machineUsageLog.create({
                data: {
                    machineId: machine.id,
                    hoursBefore: log.hoursBefore.toString(),
                    hoursAfter: log.hoursAfter.toString(),
                    delta: log.delta.toString(),
                    notes: log.notes ?? null,
                    createdById: log.createdById,
                    tenantId: machine.tenantId,
                },
            }),
        ]);
        return created;
    }
    async listUsageLogs(machineId, skip = 0, take = 20) {
        return this.prisma.machineUsageLog.findMany({
            where: { machineId },
            orderBy: { createdAt: 'desc' },
            skip,
            take,
        });
    }
    async findPreventiveDue(tenantId) {
        const rows = await this.prisma.$queryRaw `
      SELECT * FROM machines
      WHERE deleted_at IS NULL
        AND preventive_interval_hours IS NOT NULL
        AND (usage_hours - COALESCE(last_preventive_at_hours, 0)) >= preventive_interval_hours
        ${tenantId !== undefined && tenantId !== null
            ? client_1.Prisma.sql `AND tenant_id = ${tenantId}::uuid`
            : client_1.Prisma.empty}
      ORDER BY (usage_hours - COALESCE(last_preventive_at_hours, 0) - preventive_interval_hours) DESC
    `;
        return rows.map((r) => this.toDomain(r));
    }
    toDomain(row) {
        return machine_entity_1.Machine.rehydrate({
            id: row.id,
            code: row.code,
            name: row.name,
            brand: row.brand,
            model: row.model,
            serialNumber: row.serialNumber,
            status: row.status,
            usageHours: row.usageHours,
            location: row.location,
            responsibleId: row.responsibleId,
            notes: row.notes,
            preventiveIntervalHours: row.preventiveIntervalHours,
            lastPreventiveAtHours: row.lastPreventiveAtHours,
            tenantId: row.tenantId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }
};
exports.PrismaMachineRepository = PrismaMachineRepository;
exports.PrismaMachineRepository = PrismaMachineRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaMachineRepository);
//# sourceMappingURL=prisma-machine.repository.js.map