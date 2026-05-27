"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = void 0;
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
class Tool {
    id;
    code;
    _name;
    _description;
    _brand;
    _model;
    _serialNumber;
    _status;
    _location;
    _observations;
    _acquiredAt;
    tenantId;
    createdAt;
    updatedAt;
    constructor(id, code, _name, _description, _brand, _model, _serialNumber, _status, _location, _observations, _acquiredAt, tenantId, createdAt, updatedAt) {
        this.id = id;
        this.code = code;
        this._name = _name;
        this._description = _description;
        this._brand = _brand;
        this._model = _model;
        this._serialNumber = _serialNumber;
        this._status = _status;
        this._location = _location;
        this._observations = _observations;
        this._acquiredAt = _acquiredAt;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get name() { return this._name; }
    get description() { return this._description; }
    get brand() { return this._brand; }
    get model() { return this._model; }
    get serialNumber() { return this._serialNumber; }
    get status() { return this._status; }
    get location() { return this._location; }
    get observations() { return this._observations; }
    get acquiredAt() { return this._acquiredAt; }
    updateMetadata(input) {
        if (input.name !== undefined) {
            if (input.name.trim().length < 2) {
                throw new domain_exception_1.ValidationError('INVALID_NAME', 'El nombre debe tener al menos 2 caracteres');
            }
            this._name = input.name.trim();
        }
        if (input.description !== undefined)
            this._description = input.description;
        if (input.brand !== undefined)
            this._brand = input.brand;
        if (input.model !== undefined)
            this._model = input.model;
        if (input.serialNumber !== undefined)
            this._serialNumber = input.serialNumber;
        if (input.location !== undefined)
            this._location = input.location;
        if (input.observations !== undefined)
            this._observations = input.observations;
        if (input.acquiredAt !== undefined)
            this._acquiredAt = input.acquiredAt;
    }
    loan() {
        if (this._status !== 'AVAILABLE') {
            throw new domain_exception_1.InvariantError('NOT_AVAILABLE', `Sólo se puede prestar una herramienta disponible (actual: ${this._status})`);
        }
        const from = this._status;
        this._status = 'ON_LOAN';
        return { from, to: this._status };
    }
    returnFromLoan() {
        if (this._status !== 'ON_LOAN') {
            throw new domain_exception_1.InvariantError('NOT_ON_LOAN', `La herramienta no está prestada (actual: ${this._status})`);
        }
        const from = this._status;
        this._status = 'AVAILABLE';
        return { from, to: this._status };
    }
    changeAdministrativeStatus(next) {
        if (next === 'ON_LOAN') {
            throw new domain_exception_1.InvariantError('INVALID_TRANSITION', 'Para prestar una herramienta usar el flujo de préstamo');
        }
        if (this._status === 'ON_LOAN') {
            throw new domain_exception_1.InvariantError('TOOL_ON_LOAN', 'La herramienta tiene un préstamo activo: devuelva primero');
        }
        if (this._status === next) {
            throw new domain_exception_1.InvariantError('SAME_STATUS', `La herramienta ya está en estado ${next}`);
        }
        const from = this._status;
        this._status = next;
        return { from, to: next };
    }
    static rehydrate(props) {
        return new Tool(props.id, props.code, props.name, props.description, props.brand, props.model, props.serialNumber, props.status, props.location, props.observations, props.acquiredAt, props.tenantId, props.createdAt, props.updatedAt);
    }
}
exports.Tool = Tool;
//# sourceMappingURL=tool.entity.js.map