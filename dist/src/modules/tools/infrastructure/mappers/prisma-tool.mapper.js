"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaToolMapper = void 0;
const tool_entity_1 = require("../../domain/entities/tool.entity");
class PrismaToolMapper {
    static toDomain(raw) {
        return new tool_entity_1.Tool(raw.id, raw.code, raw.name, raw.description, raw.brand, raw.model, raw.serialNumber, raw.status, raw.location, raw.observations, raw.acquiredAt, raw.tenantId, raw.createdAt, raw.updatedAt, raw.deletedAt);
    }
    static toPersistence(tool) {
        return {
            id: tool.getId(),
            code: tool.getCode(),
            name: tool.getName(),
            description: tool.getDescription(),
            brand: tool.getBrand(),
            model: tool.getModel(),
            serialNumber: tool.getSerialNumber(),
            status: tool.getStatus(),
            location: tool.getLocation(),
            observations: tool.getObservations(),
            acquiredAt: tool.getAcquiredAt(),
            tenantId: tool.getTenantId(),
        };
    }
}
exports.PrismaToolMapper = PrismaToolMapper;
//# sourceMappingURL=prisma-tool.mapper.js.map