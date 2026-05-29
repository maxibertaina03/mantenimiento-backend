"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMaterialMapper = void 0;
const material_entity_1 = require("../../domain/entities/material.entity");
class PrismaMaterialMapper {
    static toDomain(raw) {
        return new material_entity_1.Material(raw.id, raw.code, raw.name, raw.description, raw.unit, raw.stock, raw.minStock, raw.location, raw.tenantId, raw.createdAt, raw.updatedAt, raw.deletedAt);
    }
    static toPersistence(material) {
        return {
            id: material.getId(),
            code: material.getCode(),
            name: material.getName(),
            description: material.getDescription(),
            unit: material.getUnit(),
            stock: material.getStock(),
            minStock: material.getMinStock(),
            location: material.getLocation(),
            tenantId: material.getTenantId(),
        };
    }
}
exports.PrismaMaterialMapper = PrismaMaterialMapper;
//# sourceMappingURL=prisma-material.mapper.js.map