"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const invalid_material_exception_1 = require("../exceptions/invalid-material.exception");
const material_unit_vo_1 = require("../value-objects/material-unit.vo");
const library_1 = require("@prisma/client/runtime/library");
class Material {
    id;
    code;
    name;
    description;
    unit;
    stock;
    minStock;
    location;
    tenantId;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(id, code, name, description = null, unit = material_unit_vo_1.MaterialUnit.UNIT, stock = new library_1.Decimal(0), minStock = new library_1.Decimal(0), location = null, tenantId = null, createdAt = new Date(), updatedAt = new Date(), deletedAt = null) {
        this.validateCode(code);
        this.validateName(name);
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.unit = unit;
        this.stock = stock;
        this.minStock = minStock;
        this.location = location;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    validateCode(code) {
        if (!code || code.trim().length === 0)
            throw new invalid_material_exception_1.InvalidMaterialException('Material code cannot be empty');
        if (code.length > 50)
            throw new invalid_material_exception_1.InvalidMaterialException('Material code cannot exceed 50 characters');
    }
    validateName(name) {
        if (!name || name.trim().length === 0)
            throw new invalid_material_exception_1.InvalidMaterialException('Material name cannot be empty');
        if (name.length > 255)
            throw new invalid_material_exception_1.InvalidMaterialException('Material name cannot exceed 255 characters');
    }
    getId() { return this.id; }
    getCode() { return this.code; }
    getName() { return this.name; }
    getDescription() { return this.description; }
    getUnit() { return this.unit; }
    getStock() { return this.stock; }
    getMinStock() { return this.minStock; }
    getLocation() { return this.location; }
    getTenantId() { return this.tenantId; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    getDeletedAt() { return this.deletedAt; }
    addStock(quantity) {
        this.stock = this.stock.plus(quantity);
        this.updatedAt = new Date();
    }
    removeStock(quantity) {
        if (this.stock.lessThan(quantity))
            throw new invalid_material_exception_1.InvalidMaterialException('Insufficient stock');
        this.stock = this.stock.minus(quantity);
        this.updatedAt = new Date();
    }
    isBelowMinimum() {
        return this.stock.lessThan(this.minStock);
    }
    changeName(newName) {
        this.validateName(newName);
        this.name = newName;
        this.updatedAt = new Date();
    }
    updateLocation(location) {
        this.location = location;
        this.updatedAt = new Date();
    }
}
exports.Material = Material;
//# sourceMappingURL=material.entity.js.map