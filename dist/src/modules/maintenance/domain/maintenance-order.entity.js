"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceOrder = void 0;
const client_1 = require("@prisma/client");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const Decimal = client_1.Prisma.Decimal;
class MaintenanceOrder {
    id;
    machineId;
    type;
    _status;
    _location;
    _externalLocation;
    _scheduledFor;
    _startedAt;
    _completedAt;
    _machineHoursSnapshot;
    _technicianId;
    _providerId;
    _cost;
    _currency;
    _description;
    _observations;
    tenantId;
    createdAt;
    updatedAt;
    constructor(id, machineId, type, _status, _location, _externalLocation, _scheduledFor, _startedAt, _completedAt, _machineHoursSnapshot, _technicianId, _providerId, _cost, _currency, _description, _observations, tenantId, createdAt, updatedAt) {
        this.id = id;
        this.machineId = machineId;
        this.type = type;
        this._status = _status;
        this._location = _location;
        this._externalLocation = _externalLocation;
        this._scheduledFor = _scheduledFor;
        this._startedAt = _startedAt;
        this._completedAt = _completedAt;
        this._machineHoursSnapshot = _machineHoursSnapshot;
        this._technicianId = _technicianId;
        this._providerId = _providerId;
        this._cost = _cost;
        this._currency = _currency;
        this._description = _description;
        this._observations = _observations;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get status() { return this._status; }
    get location() { return this._location; }
    get externalLocation() { return this._externalLocation; }
    get scheduledFor() { return this._scheduledFor; }
    get startedAt() { return this._startedAt; }
    get completedAt() { return this._completedAt; }
    get machineHoursSnapshot() { return this._machineHoursSnapshot; }
    get technicianId() { return this._technicianId; }
    get providerId() { return this._providerId; }
    get cost() { return this._cost; }
    get currency() { return this._currency; }
    get description() { return this._description; }
    get observations() { return this._observations; }
    start(at = new Date()) {
        if (this._status !== 'SCHEDULED') {
            throw new domain_exception_1.InvariantError('INVALID_TRANSITION', `Sólo se puede iniciar un mantenimiento SCHEDULED (actual: ${this._status})`);
        }
        this._status = 'IN_PROGRESS';
        this._startedAt = at;
        return { from: 'SCHEDULED', to: 'IN_PROGRESS' };
    }
    complete(input, at = new Date()) {
        if (this._status !== 'SCHEDULED' && this._status !== 'IN_PROGRESS') {
            throw new domain_exception_1.InvariantError('INVALID_TRANSITION', `Sólo se puede completar un mantenimiento SCHEDULED o IN_PROGRESS (actual: ${this._status})`);
        }
        const snapshot = new Decimal(input.machineHoursSnapshot);
        if (snapshot.lt(0)) {
            throw new domain_exception_1.ValidationError('INVALID_HOURS', 'Las horas no pueden ser negativas');
        }
        const from = this._status;
        this._status = 'COMPLETED';
        if (!this._startedAt)
            this._startedAt = at;
        this._completedAt = at;
        this._machineHoursSnapshot = snapshot;
        if (input.cost !== undefined) {
            this._cost = input.cost === null ? null : new Decimal(input.cost);
        }
        if (input.currency !== undefined)
            this._currency = input.currency;
        if (input.observations !== undefined)
            this._observations = input.observations;
        return { from, to: 'COMPLETED', hoursSnapshot: snapshot };
    }
    cancel(reason) {
        if (this._status === 'COMPLETED' || this._status === 'CANCELLED') {
            throw new domain_exception_1.InvariantError('INVALID_TRANSITION', `No se puede cancelar un mantenimiento ${this._status}`);
        }
        const from = this._status;
        this._status = 'CANCELLED';
        if (reason) {
            this._observations = [this._observations, `[CANCELACIÓN] ${reason}`]
                .filter(Boolean)
                .join('\n');
        }
        return { from, to: 'CANCELLED' };
    }
    updateMetadata(input) {
        if (this._status === 'COMPLETED' || this._status === 'CANCELLED') {
            throw new domain_exception_1.InvariantError('LOCKED', 'No se puede editar un mantenimiento finalizado');
        }
        if (input.location !== undefined)
            this._location = input.location;
        if (input.externalLocation !== undefined)
            this._externalLocation = input.externalLocation;
        if (input.scheduledFor !== undefined)
            this._scheduledFor = input.scheduledFor;
        if (input.technicianId !== undefined)
            this._technicianId = input.technicianId;
        if (input.providerId !== undefined)
            this._providerId = input.providerId;
        if (input.description !== undefined)
            this._description = input.description;
        if (input.observations !== undefined)
            this._observations = input.observations;
    }
    derivedMachineStatus() {
        if (this._status === 'IN_PROGRESS') {
            return this._location === 'EXTERNAL' ? 'EXTERNAL_MAINTENANCE' : 'INTERNAL_MAINTENANCE';
        }
        if (this._status === 'COMPLETED' || this._status === 'CANCELLED') {
            return 'OPERATIONAL';
        }
        return null;
    }
    static rehydrate(props) {
        return new MaintenanceOrder(props.id, props.machineId, props.type, props.status, props.location, props.externalLocation, props.scheduledFor, props.startedAt, props.completedAt, props.machineHoursSnapshot === null ? null : new Decimal(props.machineHoursSnapshot), props.technicianId, props.providerId, props.cost === null ? null : new Decimal(props.cost), props.currency, props.description, props.observations, props.tenantId, props.createdAt, props.updatedAt);
    }
}
exports.MaintenanceOrder = MaintenanceOrder;
//# sourceMappingURL=maintenance-order.entity.js.map