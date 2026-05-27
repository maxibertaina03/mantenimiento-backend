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
const prisma_service_1 = require("../../../../infrastructure/prisma/prisma.service");
const prisma_provider_mapper_1 = require("../mappers/prisma-provider.mapper");
let PrismaProviderRepository = class PrismaProviderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(provider) {
        const data = prisma_provider_mapper_1.PrismaProviderMapper.toPersistence(provider);
        await this.prisma.provider.upsert({
            where: { id: provider.getId() },
            update: data,
            create: data,
        });
    }
    async findById(id) {
        const raw = await this.prisma.provider.findUnique({
            where: { id },
        });
        return raw ? prisma_provider_mapper_1.PrismaProviderMapper.toDomain(raw) : null;
    }
    async findByName(name) {
        const raw = await this.prisma.provider.findFirst({
            where: { name },
        });
        return raw ? prisma_provider_mapper_1.PrismaProviderMapper.toDomain(raw) : null;
    }
    async findAll(tenantId) {
        const providers = await this.prisma.provider.findMany({
            where: tenantId ? { tenantId } : {},
        });
        return providers.map((raw) => prisma_provider_mapper_1.PrismaProviderMapper.toDomain(raw));
    }
    async delete(id) {
        await this.prisma.provider.delete({
            where: { id },
        });
    }
};
exports.PrismaProviderRepository = PrismaProviderRepository;
exports.PrismaProviderRepository = PrismaProviderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProviderRepository);
//# sourceMappingURL=prisma-provider.repository.js.map