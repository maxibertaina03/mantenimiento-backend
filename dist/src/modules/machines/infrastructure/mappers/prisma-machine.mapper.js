"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMachineMapper = void 0;
const machine_entity_1 = require("../../domain/entities/machine.entity");
class PrismaMachineMapper {
    static toDomain(raw) {
        return new machine_entity_1.Machine(raw.id, raw.code, raw.name, raw.status, raw.usageHours, raw.brand, raw.model, raw.serialNumber, raw.location, raw.responsibleId, raw.notes, raw.preventiveIntervalHours, raw.lastPreventiveAtHours, raw.tenantId, raw.createdAt, raw.updatedAt, raw.deletedAt);
    }
    static toPersistence(machine) {
        return {
            id: machine.getId(),
            code: machine.getCode(),
            name: machine.getName(),
            brand: machine.getBrand(),
            model: machine.getModel(),
            serialNumber: machine.getSerialNumber(),
            status: machine.getStatus(),
            usageHours: machine.getUsageHours(),
            location: machine.getLocation(),
            responsibleId: machine.getResponsibleId(),
            notes: machine.getNotes(),
            preventiveIntervalHours: machine.getPreventiveIntervalHours(),
            lastPreventiveAtHours: machine.getLastPreventiveAtHours(),
            tenantId: machine.getTenantId(),
        };
    }
}
exports.PrismaMachineMapper = PrismaMachineMapper;
//# sourceMappingURL=prisma-machine.mapper.js.map