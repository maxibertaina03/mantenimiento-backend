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
const prisma_service_1 = require("../../../../infrastructure/prisma/prisma.service");
const prisma_tool_mapper_1 = require("../mappers/prisma-tool.mapper");
let PrismaToolRepository = class PrismaToolRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(tool) {
        const data = prisma_tool_mapper_1.PrismaToolMapper.toPersistence(tool);
        await this.prisma.tool.upsert({
            where: { id: tool.getId() },
            update: data,
            create: data,
        });
    }
    async findById(id) {
        const raw = await this.prisma.tool.findUnique({ where: { id } });
        return raw ? prisma_tool_mapper_1.PrismaToolMapper.toDomain(raw) : null;
    }
    async findByCode(code) {
        const raw = await this.prisma.tool.findUnique({ where: { code } });
        return raw ? prisma_tool_mapper_1.PrismaToolMapper.toDomain(raw) : null;
    }
    async findAll(tenantId) {
        const tools = await this.prisma.tool.findMany({
            where: tenantId ? { tenantId } : {},
        });
        return tools.map((raw) => prisma_tool_mapper_1.PrismaToolMapper.toDomain(raw));
    }
    async delete(id) {
        await this.prisma.tool.delete({ where: { id } });
    }
};
exports.PrismaToolRepository = PrismaToolRepository;
exports.PrismaToolRepository = PrismaToolRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaToolRepository);
//# sourceMappingURL=prisma-tool.repository.js.map