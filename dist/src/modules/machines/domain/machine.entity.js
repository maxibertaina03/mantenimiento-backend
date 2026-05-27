"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
const client_1 = require("@prisma/client");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const Decimal = client_1.Prisma.Decimal;
class Machine {
    id;
    code;
    _name;
    _brand;
    _model;
    _serialNumber;
    _status;
    _usageHours;
    _location;
    _responsibleId;
    _notes;
    _preventive;
    tenantId;
    createdAt;
    updatedAt;
    constructor(id, code, _name, _brand, _model, _serialNumber, _status, _usageHours, _location, _responsibleId, _notes, _preventive, tenantId, createdAt, updatedAt) {
        this.id = id;
        this.code = code;
        this._name = _name;
        this._brand = _brand;
        this._model = _model;
        this._serialNumber = _serialNumber;
        this._status = _status;
        this._usageHours = _usageHours;
        this._location = _location;
        this._responsibleId = _responsibleId;
        this._notes = _notes;
        this._preventive = _preventive;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get name() { return this._name; }
    get brand() { return this._brand; }
    get model() { return this._model; }
    get serialNumber() { return this._serialNumber; }
    get status() { return this._status; }
    get usageHours() { return this._usageHours; }
    get location() { return this._location; }
    get responsibleId() { return this._responsibleId; }
    get notes() { return this._notes; }
    get preventive() { return this._preventive; }
    rename(name) {
        if (name.trim().length < 2) {
            throw new domain_exception_1.ValidationError('INVALID_NAME', 'El nombre debe tener al menos 2 caracteres');
        }
        this._name = name.trim();
    }
    updateMetadata(input) {
        if (input.brand !== undefined)
            this._brand = input.brand;
        if (input.model !== undefined)
            this._model = input.model;
        if (input.serialNumber !== undefined)
            this._serialNumber = input.serialNumber;
        if (input.location !== undefined)
            this._location = input.location;
        if (input.responsibleId !== undefined)
            this._responsibleId = input.responsibleId;
        if (input.notes !== undefined)
            this._notes = input.notes;
        if (input.preventiveIntervalHours !== undefined) {
            const next = input.preventiveIntervalHours === null
                ? null
                : new Decimal(input.preventiveIntervalHours);
            if (next !== null && next.lte(0)) {
                throw new domain_exception_1.ValidationError('INVALID_INTERVAL', 'El intervalo preventivo debe ser mayor a cero');
            }
            this._preventive = { ...this._preventive, intervalHours: next };
        }
    }
    changeStatus(next) {
        if (this._status === next) {
            throw new domain_exception_1.InvariantError('SAME_STATUS', `La máquina ya está en estado ${next}`);
        }
        const from = this._status;
        this._status = next;
        return { from, to: next };
    }
    logUsageHours(input) {
        const hoursAfter = new Decimal(input.hoursAfter);
        if (hoursAfter.lte(this._usageHours)) {
            throw new domain_exception_1.InvariantError('HOURS_NOT_INCREASING', `Las horas deben ser mayores a las actuales (${this._usageHours.toString()})`);
        }
        const delta = hoursAfter.sub(this._usageHours);
        const hoursBefore = this._usageHours;
        this._usageHours = hoursAfter;
        return { hoursBefore, hoursAfter, delta };
    }
    markPreventiveCompleted(atHours) {
        const at = new Decimal(atHours);
        this._preventive = { ...this._preventive, lastDoneAtHours: at };
    }
    isPreventiveDue() {
        const interval = this._preventive.intervalHours;
        if (interval === null || interval.lte(0))
            return false;
        const lastDone = this._preventive.lastDoneAtHours ?? new Decimal(0);
        return this._usageHours.sub(lastDone).gte(interval);
    }
    hoursUntilPreventive() {
        const interval = this._preventive.intervalHours;
        if (interval === null || interval.lte(0))
            return null;
        const lastDone = this._preventive.lastDoneAtHours ?? new Decimal(0);
        return lastDone.add(interval).sub(this._usageHours);
    }
    static rehydrate(props) {
        return new Machine(props.id, props.code, props.name, props.brand, props.model, props.serialNumber, props.status, new Decimal(props.usageHours), props.location, props.responsibleId, props.notes, {
            intervalHours: props.preventiveIntervalHours === null
                ? null
                : new Decimal(props.preventiveIntervalHours),
            lastDoneAtHours: props.lastPreventiveAtHours === null
                ? null
                : new Decimal(props.lastPreventiveAtHours),
        }, props.tenantId, props.createdAt, props.updatedAt);
    }
}
exports.Machine = Machine;
//# sourceMappingURL=machine.entity.js.map