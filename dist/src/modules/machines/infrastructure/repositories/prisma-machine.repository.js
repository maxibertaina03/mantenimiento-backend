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
const prisma_service_1 = require("../../../../infrastructure/prisma/prisma.service");
const prisma_machine_mapper_1 = require("../mappers/prisma-machine.mapper");
let PrismaMachineRepository = class PrismaMachineRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(machine) {
        const data = prisma_machine_mapper_1.PrismaMachineMapper.toPersistence(machine);
        await this.prisma.machine.upsert({
            where: { id: machine.getId() },
            update: data,
            create: data,
        });
    }
    async findById(id) {
        const raw = await this.prisma.machine.findUnique({
            where: { id },
        });
        return raw ? prisma_machine_mapper_1.PrismaMachineMapper.toDomain(raw) : null;
    }
    async findByCode(code) {
        const raw = await this.prisma.machine.findUnique({
            where: { code },
        });
        return raw ? prisma_machine_mapper_1.PrismaMachineMapper.toDomain(raw) : null;
    }
    async findAll(tenantId) {
        const machines = await this.prisma.machine.findMany({
            where: tenantId ? { tenantId } : {},
        });
        return machines.map((raw) => prisma_machine_mapper_1.PrismaMachineMapper.toDomain(raw));
    }
    async delete(id) {
        await this.prisma.machine.delete({
            where: { id },
        });
    }
};
exports.PrismaMachineRepository = PrismaMachineRepository;
exports.PrismaMachineRepository = PrismaMachineRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaMachineRepository);
//# sourceMappingURL=prisma-machine.repository.js.map