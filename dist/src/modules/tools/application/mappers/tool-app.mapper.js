"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolAppMapper = void 0;
class ToolAppMapper {
    static toOutput(tool) {
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
            createdAt: tool.getCreatedAt(),
        };
    }
}
exports.ToolAppMapper = ToolAppMapper;
//# sourceMappingURL=tool-app.mapper.js.map