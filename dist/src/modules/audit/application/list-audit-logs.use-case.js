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
exports.ListAuditLogsUseCase = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
let ListAuditLogsUseCase = class ListAuditLogsUseCase {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute(input) {
        const page = Math.max(1, input.page ?? 1);
        const pageSize = Math.min(200, Math.max(1, input.pageSize ?? 50));
        const where = {
            ...(input.entityType ? { entityType: input.entityType } : {}),
            ...(input.entityId ? { entityId: input.entityId } : {}),
            ...(input.actorId ? { actorId: input.actorId } : {}),
            ...(input.action ? { action: input.action } : {}),
            ...(input.tenantId !== undefined ? { tenantId: input.tenantId } : {}),
            ...(input.from || input.to
                ? {
                    createdAt: {
                        ...(input.from ? { gte: new Date(input.from) } : {}),
                        ...(input.to ? { lte: new Date(input.to) } : {}),
                    },
                }
                : {}),
        };
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.auditLog.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return { items: rows, total, page, pageSize };
    }
};
exports.ListAuditLogsUseCase = ListAuditLogsUseCase;
exports.ListAuditLogsUseCase = ListAuditLogsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListAuditLogsUseCase);
//# sourceMappingURL=list-audit-logs.use-case.js.map