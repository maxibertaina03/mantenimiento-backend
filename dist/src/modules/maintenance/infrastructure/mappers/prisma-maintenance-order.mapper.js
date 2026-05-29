"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMaintenanceOrderMapper = void 0;
const maintenance_order_entity_1 = require("../../domain/entities/maintenance-order.entity");
class PrismaMaintenanceOrderMapper {
    static toDomain(raw) {
        return new maintenance_order_entity_1.MaintenanceOrder(raw.id, raw.machineId, raw.type, raw.status, raw.location, raw.externalLocation || null, raw.scheduledFor, raw.startedAt, raw.completedAt, raw.machineHoursSnapshot, raw.technicianId, raw.providerId, raw.cost, raw.currency || 'USD', raw.description, raw.observations, raw.tenantId, raw.createdAt, raw.updatedAt, raw.deletedAt);
    }
    static toPersistence(order) {
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
            machineHoursSnapshot: order.getMachineHoursSnapshot(),
            technicianId: order.getTechnicianId(),
            providerId: order.getProviderId(),
            cost: order.getCost(),
            currency: order.getCurrency(),
            description: order.getDescription(),
            observations: order.getObservations(),
            tenantId: order.getTenantId(),
        };
    }
}
exports.PrismaMaintenanceOrderMapper = PrismaMaintenanceOrderMapper;
//# sourceMappingURL=prisma-maintenance-order.mapper.js.map