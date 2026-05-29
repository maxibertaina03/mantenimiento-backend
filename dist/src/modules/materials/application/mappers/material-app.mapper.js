"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialAppMapper = void 0;
class MaterialAppMapper {
    static toOutput(material) {
        return {
            id: material.getId(),
            code: material.getCode(),
            name: material.getName(),
            description: material.getDescription(),
            unit: material.getUnit(),
            stock: material.getStock(),
            minStock: material.getMinStock(),
            location: material.getLocation(),
            createdAt: material.getCreatedAt(),
        };
    }
}
exports.MaterialAppMapper = MaterialAppMapper;
//# sourceMappingURL=material-app.mapper.js.map