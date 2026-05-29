"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachinePresenterMapper = void 0;
class MachinePresenterMapper {
    static toResponse(output) {
        return {
            id: output.id,
            code: output.code,
            name: output.name,
            status: output.status,
            brand: output.brand,
            model: output.model,
            serialNumber: output.serialNumber,
            usageHours: output.usageHours,
            location: output.location,
            responsibleId: output.responsibleId,
            notes: output.notes,
            preventiveIntervalHours: output.preventiveIntervalHours,
            lastPreventiveAtHours: output.lastPreventiveAtHours,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
}
exports.MachinePresenterMapper = MachinePresenterMapper;
//# sourceMappingURL=machine-presenter.mapper.js.map