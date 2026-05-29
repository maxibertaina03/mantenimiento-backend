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
exports.PrismaMaintenanceOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/prisma/prisma.service");
const prisma_maintenance_order_mapper_1 = require("../mappers/prisma-maintenance-order.mapper");
let PrismaMaintenanceOrderRepository = class PrismaMaintenanceOrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(order) {
        const data = prisma_maintenance_order_mapper_1.PrismaMaintenanceOrderMapper.toPersistence(order);
        await this.prisma.maintenanceOrder.upsert({
            where: { id: order.getId() },
            update: data,
            create: data,
        });
    }
    async findById(id) {
        const raw = await this.prisma.maintenanceOrder.findUnique({ where: { id } });
        return raw ? prisma_maintenance_order_mapper_1.PrismaMaintenanceOrderMapper.toDomain(raw) : null;
    }
    async findByMachineId(machineId) {
        const orders = await this.prisma.maintenanceOrder.findMany({ where: { machineId } });
        return orders.map((raw) => prisma_maintenance_order_mapper_1.PrismaMaintenanceOrderMapper.toDomain(raw));
    }
    async findAll(tenantId) {
        const orders = await this.prisma.maintenanceOrder.findMany({
            where: tenantId ? { tenantId } : {},
        });
        return orders.map((raw) => prisma_maintenance_order_mapper_1.PrismaMaintenanceOrderMapper.toDomain(raw));
    }
    async delete(id) {
        await this.prisma.maintenanceOrder.delete({ where: { id } });
    }
};
exports.PrismaMaintenanceOrderRepository = PrismaMaintenanceOrderRepository;
exports.PrismaMaintenanceOrderRepository = PrismaMaintenanceOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaMaintenanceOrderRepository);
//# sourceMappingURL=prisma-maintenance-order.repository.js.map