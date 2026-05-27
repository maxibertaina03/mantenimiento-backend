"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const client_1 = require("@prisma/client");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const Decimal = client_1.Prisma.Decimal;
class Material {
    id;
    code;
    _name;
    _description;
    _unit;
    _stock;
    _minStock;
    _location;
    tenantId;
    createdAt;
    updatedAt;
    constructor(id, code, _name, _description, _unit, _stock, _minStock, _location, tenantId, createdAt, updatedAt) {
        this.id = id;
        this.code = code;
        this._name = _name;
        this._description = _description;
        this._unit = _unit;
        this._stock = _stock;
        this._minStock = _minStock;
        this._location = _location;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get name() { return this._name; }
    get description() { return this._description; }
    get unit() { return this._unit; }
    get stock() { return this._stock; }
    get minStock() { return this._minStock; }
    get location() { return this._location; }
    get isLowStock() {
        return this._minStock.gt(0) && this._stock.lt(this._minStock);
    }
    updateMetadata(input) {
        if (input.name !== undefined) {
            if (input.name.trim().length < 2) {
                throw new domain_exception_1.ValidationError('INVALID_NAME', 'El nombre debe tener al menos 2 caracteres');
            }
            this._name = input.name.trim();
        }
        if (input.description !== undefined)
            this._description = input.description;
        if (input.unit !== undefined)
            this._unit = input.unit;
        if (input.minStock !== undefined) {
            const next = new Decimal(input.minStock);
            if (next.lt(0)) {
                throw new domain_exception_1.ValidationError('INVALID_MIN_STOCK', 'El stock mínimo no puede ser negativo');
            }
            this._minStock = next;
        }
        if (input.location !== undefined)
            this._location = input.location;
    }
    applyMovement(input) {
        const quantity = new Decimal(input.quantity);
        if (quantity.lte(0)) {
            throw new domain_exception_1.ValidationError('INVALID_QUANTITY', 'La cantidad debe ser mayor a cero');
        }
        const stockBefore = this._stock;
        const delta = this.deltaFor(input.type, quantity);
        const stockAfter = stockBefore.add(delta);
        if (stockAfter.lt(0)) {
            throw new domain_exception_1.InvariantError('INSUFFICIENT_STOCK', `Stock insuficiente: actual ${stockBefore.toString()}, requerido ${quantity.toString()}`);
        }
        this._stock = stockAfter;
        return { type: input.type, quantity, delta, stockBefore, stockAfter };
    }
    applyAdjustment(quantity, sign, reason) {
        const q = new Decimal(quantity);
        if (q.lte(0)) {
            throw new domain_exception_1.ValidationError('INVALID_QUANTITY', 'La cantidad debe ser mayor a cero');
        }
        const stockBefore = this._stock;
        const delta = sign === 1 ? q : q.negated();
        const stockAfter = stockBefore.add(delta);
        if (stockAfter.lt(0)) {
            throw new domain_exception_1.InvariantError('INSUFFICIENT_STOCK', `Stock insuficiente: actual ${stockBefore.toString()}, requerido ${q.toString()}`);
        }
        this._stock = stockAfter;
        void reason;
        return { type: 'ADJUSTMENT', quantity: q, delta, stockBefore, stockAfter };
    }
    deltaFor(type, quantity) {
        switch (type) {
            case 'INBOUND':
            case 'ADJUSTMENT':
                return quantity;
            case 'OUTBOUND':
            case 'CONSUMPTION':
                return quantity.negated();
        }
    }
    static rehydrate(props) {
        return new Material(props.id, props.code, props.name, props.description, props.unit, new Decimal(props.stock), new Decimal(props.minStock), props.location, props.tenantId, props.createdAt, props.updatedAt);
    }
}
exports.Material = Material;
//# sourceMappingURL=material.entity.js.map