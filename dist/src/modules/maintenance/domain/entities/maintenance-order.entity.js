"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceOrder = void 0;
const maintenance_status_vo_1 = require("../value-objects/maintenance-status.vo");
const maintenance_location_vo_1 = require("../value-objects/maintenance-location.vo");
class MaintenanceOrder {
    id;
    machineId;
    type;
    status;
    location;
    externalLocation;
    scheduledFor;
    startedAt;
    completedAt;
    machineHoursSnapshot;
    technicianId;
    providerId;
    cost;
    currency;
    description;
    observations;
    tenantId;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(id, machineId, type, status = maintenance_status_vo_1.MaintenanceStatus.SCHEDULED, location = maintenance_location_vo_1.MaintenanceLocation.INTERNAL, externalLocation = null, scheduledFor = null, startedAt = null, completedAt = null, machineHoursSnapshot = null, technicianId = null, providerId = null, cost = null, currency = 'USD', description = null, observations = null, tenantId = null, createdAt = new Date(), updatedAt = new Date(), deletedAt = null) {
        this.id = id;
        this.machineId = machineId;
        this.type = type;
        this.status = status;
        this.location = location;
        this.externalLocation = externalLocation;
        this.scheduledFor = scheduledFor;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.machineHoursSnapshot = machineHoursSnapshot;
        this.technicianId = technicianId;
        this.providerId = providerId;
        this.cost = cost;
        this.currency = currency;
        this.description = description;
        this.observations = observations;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    getId() { return this.id; }
    getMachineId() { return this.machineId; }
    getType() { return this.type; }
    getStatus() { return this.status; }
    getLocation() { return this.location; }
    getExternalLocation() { return this.externalLocation; }
    getScheduledFor() { return this.scheduledFor; }
    getStartedAt() { return this.startedAt; }
    getCompletedAt() { return this.completedAt; }
    getMachineHoursSnapshot() { return this.machineHoursSnapshot; }
    getTechnicianId() { return this.technicianId; }
    getProviderId() { return this.providerId; }
    getCost() { return this.cost; }
    getCurrency() { return this.currency; }
    getDescription() { return this.description; }
    getObservations() { return this.observations; }
    getTenantId() { return this.tenantId; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    getDeletedAt() { return this.deletedAt; }
    start() {
        if (this.status !== maintenance_status_vo_1.MaintenanceStatus.SCHEDULED) {
            throw new Error('Can only start scheduled maintenance');
        }
        this.status = maintenance_status_vo_1.MaintenanceStatus.IN_PROGRESS;
        this.startedAt = new Date();
        this.updatedAt = new Date();
    }
    complete() {
        if (this.status !== maintenance_status_vo_1.MaintenanceStatus.IN_PROGRESS && this.status !== maintenance_status_vo_1.MaintenanceStatus.SCHEDULED) {
            throw new Error('Can only complete in-progress or scheduled maintenance');
        }
        this.status = maintenance_status_vo_1.MaintenanceStatus.COMPLETED;
        this.completedAt = new Date();
        this.updatedAt = new Date();
    }
    cancel() {
        if (this.status === maintenance_status_vo_1.MaintenanceStatus.COMPLETED || this.status === maintenance_status_vo_1.MaintenanceStatus.CANCELLED) {
            throw new Error('Cannot cancel completed or already cancelled maintenance');
        }
        this.status = maintenance_status_vo_1.MaintenanceStatus.CANCELLED;
        this.updatedAt = new Date();
    }
}
exports.MaintenanceOrder = MaintenanceOrder;
//# sourceMappingURL=maintenance-order.entity.js.map