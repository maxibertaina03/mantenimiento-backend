"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
const invalid_machine_exception_1 = require("../exceptions/invalid-machine.exception");
const machine_status_vo_1 = require("../value-objects/machine-status.vo");
const library_1 = require("@prisma/client/runtime/library");
class Machine {
    id;
    code;
    name;
    brand;
    model;
    serialNumber;
    status;
    usageHours;
    location;
    responsibleId;
    notes;
    preventiveIntervalHours;
    lastPreventiveAtHours;
    tenantId;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(id, code, name, status = machine_status_vo_1.MachineStatus.OPERATIONAL, usageHours = new library_1.Decimal(0), brand = null, model = null, serialNumber = null, location = null, responsibleId = null, notes = null, preventiveIntervalHours = null, lastPreventiveAtHours = null, tenantId = null, createdAt = new Date(), updatedAt = new Date(), deletedAt = null) {
        this.validateCode(code);
        this.validateName(name);
        this.id = id;
        this.code = code;
        this.name = name;
        this.brand = brand;
        this.model = model;
        this.serialNumber = serialNumber;
        this.status = status;
        this.usageHours = usageHours;
        this.location = location;
        this.responsibleId = responsibleId;
        this.notes = notes;
        this.preventiveIntervalHours = preventiveIntervalHours;
        this.lastPreventiveAtHours = lastPreventiveAtHours;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    validateCode(code) {
        if (!code || code.trim().length === 0) {
            throw new invalid_machine_exception_1.InvalidMachineException('Machine code cannot be empty');
        }
        if (code.length > 50) {
            throw new invalid_machine_exception_1.InvalidMachineException('Machine code cannot exceed 50 characters');
        }
    }
    validateName(name) {
        if (!name || name.trim().length === 0) {
            throw new invalid_machine_exception_1.InvalidMachineException('Machine name cannot be empty');
        }
        if (name.length > 255) {
            throw new invalid_machine_exception_1.InvalidMachineException('Machine name cannot exceed 255 characters');
        }
    }
    getId() { return this.id; }
    getCode() { return this.code; }
    getName() { return this.name; }
    getBrand() { return this.brand; }
    getModel() { return this.model; }
    getSerialNumber() { return this.serialNumber; }
    getStatus() { return this.status; }
    getUsageHours() { return this.usageHours; }
    getLocation() { return this.location; }
    getResponsibleId() { return this.responsibleId; }
    getNotes() { return this.notes; }
    getPreventiveIntervalHours() { return this.preventiveIntervalHours; }
    getLastPreventiveAtHours() { return this.lastPreventiveAtHours; }
    getTenantId() { return this.tenantId; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    getDeletedAt() { return this.deletedAt; }
    changeName(newName) {
        this.validateName(newName);
        this.name = newName;
        this.updatedAt = new Date();
    }
    updateLocation(location) {
        this.location = location;
        this.updatedAt = new Date();
    }
    changeStatus(newStatus) {
        this.status = newStatus;
        this.updatedAt = new Date();
    }
    logUsageHours(hours) {
        this.usageHours = this.usageHours.add(hours);
        this.updatedAt = new Date();
    }
}
exports.Machine = Machine;
//# sourceMappingURL=machine.entity.js.map