"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
class Provider {
    id;
    _name;
    _taxId;
    _contactName;
    _phone;
    _email;
    _address;
    _serviceType;
    _notes;
    _active;
    tenantId;
    createdAt;
    updatedAt;
    constructor(id, _name, _taxId, _contactName, _phone, _email, _address, _serviceType, _notes, _active, tenantId, createdAt, updatedAt) {
        this.id = id;
        this._name = _name;
        this._taxId = _taxId;
        this._contactName = _contactName;
        this._phone = _phone;
        this._email = _email;
        this._address = _address;
        this._serviceType = _serviceType;
        this._notes = _notes;
        this._active = _active;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get name() { return this._name; }
    get taxId() { return this._taxId; }
    get contactName() { return this._contactName; }
    get phone() { return this._phone; }
    get email() { return this._email; }
    get address() { return this._address; }
    get serviceType() { return this._serviceType; }
    get notes() { return this._notes; }
    get active() { return this._active; }
    updateMetadata(input) {
        if (input.name !== undefined) {
            if (input.name.trim().length < 2) {
                throw new domain_exception_1.ValidationError('INVALID_NAME', 'El nombre debe tener al menos 2 caracteres');
            }
            this._name = input.name.trim();
        }
        if (input.taxId !== undefined)
            this._taxId = input.taxId;
        if (input.contactName !== undefined)
            this._contactName = input.contactName;
        if (input.phone !== undefined)
            this._phone = input.phone;
        if (input.email !== undefined)
            this._email = input.email;
        if (input.address !== undefined)
            this._address = input.address;
        if (input.serviceType !== undefined)
            this._serviceType = input.serviceType;
        if (input.notes !== undefined)
            this._notes = input.notes;
    }
    activate() {
        this._active = true;
    }
    deactivate() {
        this._active = false;
    }
    static rehydrate(props) {
        return new Provider(props.id, props.name, props.taxId, props.contactName, props.phone, props.email, props.address, props.serviceType, props.notes, props.active, props.tenantId, props.createdAt, props.updatedAt);
    }
}
exports.Provider = Provider;
//# sourceMappingURL=provider.entity.js.map