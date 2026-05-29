"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineAppMapper = void 0;
class MachineAppMapper {
    static toOutput(machine) {
        return {
            id: machine.getId(),
            code: machine.getCode(),
            name: machine.getName(),
            status: machine.getStatus(),
            brand: machine.getBrand(),
            model: machine.getModel(),
            serialNumber: machine.getSerialNumber(),
            usageHours: machine.getUsageHours(),
            location: machine.getLocation(),
            responsibleId: machine.getResponsibleId(),
            notes: machine.getNotes(),
            preventiveIntervalHours: machine.getPreventiveIntervalHours(),
            lastPreventiveAtHours: machine.getLastPreventiveAtHours(),
            createdAt: machine.getCreatedAt(),
        };
    }
    static toListItem(machine) {
        return {
            id: machine.getId(),
            code: machine.getCode(),
            name: machine.getName(),
            status: machine.getStatus(),
            usageHours: machine.getUsageHours(),
            location: machine.getLocation(),
            brand: machine.getBrand(),
        };
    }
}
exports.MachineAppMapper = MachineAppMapper;
//# sourceMappingURL=machine-app.mapper.js.map