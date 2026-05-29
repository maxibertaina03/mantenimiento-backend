"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolPresenterMapper = void 0;
class ToolPresenterMapper {
    static toResponse(output) {
        return {
            id: output.id,
            code: output.code,
            name: output.name,
            description: output.description,
            brand: output.brand,
            model: output.model,
            serialNumber: output.serialNumber,
            status: output.status,
            location: output.location,
            observations: output.observations,
            acquiredAt: output.acquiredAt,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
}
exports.ToolPresenterMapper = ToolPresenterMapper;
//# sourceMappingURL=tool-presenter.mapper.js.map