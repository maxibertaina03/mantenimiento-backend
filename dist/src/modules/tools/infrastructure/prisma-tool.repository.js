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
exports.PrismaToolRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const tool_entity_1 = require("../domain/tool.entity");
let PrismaToolRepository = class PrismaToolRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(props) {
        const row = await this.prisma.tool.create({
            data: {
                code: props.code,
                name: props.name,
                description: props.description ?? null,
                brand: props.brand ?? null,
                model: props.model ?? null,
                serialNumber: props.serialNumber ?? null,
                status: props.status ?? 'AVAILABLE',
                location: props.location ?? null,
                observations: props.observations ?? null,
                acquiredAt: props.acquiredAt ?? null,
                tenantId: props.tenantId ?? null,
            },
        });
        return this.toDomain(row);
    }
    async findById(id) {
        const row = await this.prisma.tool.findFirst({ where: { id, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async findByCode(code) {
        const row = await this.prisma.tool.findFirst({ where: { code, deletedAt: null } });
        return row ? this.toDomain(row) : null;
    }
    async list(query) {
        const where = {
            deletedAt: null,
            ...(query.status ? { status: query.status } : {}),
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
            this.prisma.tool.findMany({
                where,
                skip: query.skip ?? 0,
                take: query.take ?? 20,
                orderBy: [{ status: 'asc' }, { name: 'asc' }],
            }),
            this.prisma.tool.count({ where }),
        ]);
        return { items: rows.map((r) => this.toDomain(r)), total };
    }
    async save(tool) {
        const row = await this.prisma.tool.update({
            where: { id: tool.id },
            data: {
                name: tool.name,
                description: tool.description,
                brand: tool.brand,
                model: tool.model,
                serialNumber: tool.serialNumber,
                status: tool.status,
                location: tool.location,
                observations: tool.observations,
                acquiredAt: tool.acquiredAt,
            },
        });
        return this.toDomain(row);
    }
    async softDelete(id) {
        await this.prisma.tool.update({ where: { id }, data: { deletedAt: new Date() } });
    }
    async createLoanWithToolUpdate(tool, props) {
        return this.prisma.$transaction(async (tx) => {
            const active = await tx.toolLoan.findFirst({
                where: { toolId: tool.id, status: 'ACTIVE' },
            });
            if (active) {
                throw new domain_exception_1.ConflictError('LOAN_ALREADY_ACTIVE', 'La herramienta ya tiene un préstamo activo');
            }
            await tx.tool.update({
                where: { id: tool.id },
                data: { status: tool.status },
            });
            return tx.toolLoan.create({
                data: {
                    toolId: props.toolId,
                    responsibleId: props.responsibleId,
                    expectedAt: props.expectedAt ?? null,
                    notes: props.notes ?? null,
                    tenantId: props.tenantId ?? null,
                    status: 'ACTIVE',
                },
            });
        });
    }
    async closeActiveLoan(tool, returnedAt) {
        return this.prisma.$transaction(async (tx) => {
            const active = await tx.toolLoan.findFirst({
                where: { toolId: tool.id, status: 'ACTIVE' },
            });
            if (!active) {
                throw new domain_exception_1.ConflictError('NO_ACTIVE_LOAN', 'No hay un préstamo activo para esta herramienta');
            }
            await tx.tool.update({
                where: { id: tool.id },
                data: { status: tool.status },
            });
            return tx.toolLoan.update({
                where: { id: active.id },
                data: { status: 'RETURNED', returnedAt },
            });
        });
    }
    async findActiveLoan(toolId) {
        return this.prisma.toolLoan.findFirst({
            where: { toolId, status: 'ACTIVE' },
            orderBy: { loanedAt: 'desc' },
        });
    }
    async listLoans(toolId, skip = 0, take = 20) {
        return this.prisma.toolLoan.findMany({
            where: { toolId },
            orderBy: { loanedAt: 'desc' },
            skip,
            take,
        });
    }
    async countActiveLoans(tenantId) {
        return this.prisma.toolLoan.count({
            where: {
                status: 'ACTIVE',
                ...(tenantId !== undefined ? { tenantId } : {}),
            },
        });
    }
    toDomain(row) {
        return tool_entity_1.Tool.rehydrate({
            id: row.id,
            code: row.code,
            name: row.name,
            description: row.description,
            brand: row.brand,
            model: row.model,
            serialNumber: row.serialNumber,
            status: row.status,
            location: row.location,
            observations: row.observations,
            acquiredAt: row.acquiredAt,
            tenantId: row.tenantId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }
};
exports.PrismaToolRepository = PrismaToolRepository;
exports.PrismaToolRepository = PrismaToolRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaToolRepository);
//# sourceMappingURL=prisma-tool.repository.js.map