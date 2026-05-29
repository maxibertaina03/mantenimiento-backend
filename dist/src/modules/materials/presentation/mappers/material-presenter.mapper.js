"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialPresenterMapper = void 0;
class MaterialPresenterMapper {
    static toResponse(output) {
        return {
            id: output.id,
            code: output.code,
            name: output.name,
            description: output.description,
            unit: output.unit,
            stock: output.stock,
            minStock: output.minStock,
            location: output.location,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
}
exports.MaterialPresenterMapper = MaterialPresenterMapper;
//# sourceMappingURL=material-presenter.mapper.js.map