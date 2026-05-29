"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceOrderAppMapper = void 0;
class MaintenanceOrderAppMapper {
    static toOutput(order) {
        return {
            id: order.getId(),
            machineId: order.getMachineId(),
            type: order.getType(),
            status: order.getStatus(),
            location: order.getLocation(),
            externalLocation: order.getExternalLocation(),
            scheduledFor: order.getScheduledFor(),
            startedAt: order.getStartedAt(),
            completedAt: order.getCompletedAt(),
            technicianId: order.getTechnicianId(),
            providerId: order.getProviderId(),
            cost: order.getCost(),
            currency: order.getCurrency(),
            description: order.getDescription(),
            observations: order.getObservations(),
            createdAt: order.getCreatedAt(),
        };
    }
    static toListItem(order) {
        return {
            id: order.getId(),
            machineId: order.getMachineId(),
            type: order.getType(),
            status: order.getStatus(),
            location: order.getLocation(),
            scheduledFor: order.getScheduledFor(),
            startedAt: order.getStartedAt(),
            createdAt: order.getCreatedAt(),
        };
    }
}
exports.MaintenanceOrderAppMapper = MaintenanceOrderAppMapper;
//# sourceMappingURL=maintenance-order-app.mapper.js.map