"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const invalid_provider_exception_1 = require("../exceptions/invalid-provider.exception");
const provider_service_type_vo_1 = require("../value-objects/provider-service-type.vo");
class Provider {
    id;
    name;
    taxId;
    contactName;
    phone;
    email;
    address;
    serviceType;
    notes;
    active;
    tenantId;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(id, name, taxId = null, contactName = null, phone = null, email = null, address = null, serviceType = provider_service_type_vo_1.ProviderServiceType.MAINTENANCE, notes = null, active = true, tenantId = null, createdAt = new Date(), updatedAt = new Date(), deletedAt = null) {
        this.validateName(name);
        this.id = id;
        this.name = name;
        this.taxId = taxId;
        this.contactName = contactName;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.serviceType = serviceType;
        this.notes = notes;
        this.active = active;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    validateName(name) {
        if (!name || name.trim().length === 0) {
            throw new invalid_provider_exception_1.InvalidProviderException('Provider name cannot be empty');
        }
        if (name.length > 255) {
            throw new invalid_provider_exception_1.InvalidProviderException('Provider name cannot exceed 255 characters');
        }
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getTaxId() {
        return this.taxId;
    }
    getContactName() {
        return this.contactName;
    }
    getPhone() {
        return this.phone;
    }
    getEmail() {
        return this.email;
    }
    getAddress() {
        return this.address;
    }
    getServiceType() {
        return this.serviceType;
    }
    getNotes() {
        return this.notes;
    }
    isActive() {
        return this.active;
    }
    getTenantId() {
        return this.tenantId;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getDeletedAt() {
        return this.deletedAt;
    }
    changeName(newName) {
        this.validateName(newName);
        this.name = newName;
        this.updatedAt = new Date();
    }
    updateContactInfo(contactName, phone, email, address) {
        if (contactName !== undefined)
            this.contactName = contactName;
        if (phone !== undefined)
            this.phone = phone;
        if (email !== undefined)
            this.email = email;
        if (address !== undefined)
            this.address = address;
        this.updatedAt = new Date();
    }
    changeServiceType(serviceType) {
        this.serviceType = serviceType;
        this.updatedAt = new Date();
    }
    activate() {
        this.active = true;
        this.updatedAt = new Date();
    }
    deactivate() {
        this.active = false;
        this.updatedAt = new Date();
    }
    addNotes(notes) {
        this.notes = notes;
        this.updatedAt = new Date();
    }
}
exports.Provider = Provider;
//# sourceMappingURL=provider.entity.js.map