"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceOrderPresenterMapper = void 0;
class MaintenanceOrderPresenterMapper {
    static toResponse(output) {
        return {
            id: output.id,
            machineId: output.machineId,
            type: output.type,
            status: output.status,
            location: output.location,
            cost: output.cost,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
}
exports.MaintenanceOrderPresenterMapper = MaintenanceOrderPresenterMapper;
//# sourceMappingURL=maintenance-order-presenter.mapper.js.map