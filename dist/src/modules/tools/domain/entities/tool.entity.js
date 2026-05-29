"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = void 0;
const invalid_tool_exception_1 = require("../exceptions/invalid-tool.exception");
const tool_status_vo_1 = require("../value-objects/tool-status.vo");
class Tool {
    id;
    code;
    name;
    description;
    brand;
    model;
    serialNumber;
    status;
    location;
    observations;
    acquiredAt;
    tenantId;
    createdAt;
    updatedAt;
    deletedAt;
    constructor(id, code, name, description = null, brand = null, model = null, serialNumber = null, status = tool_status_vo_1.ToolStatus.AVAILABLE, location = null, observations = null, acquiredAt = null, tenantId = null, createdAt = new Date(), updatedAt = new Date(), deletedAt = null) {
        this.validateCode(code);
        this.validateName(name);
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.model = model;
        this.serialNumber = serialNumber;
        this.status = status;
        this.location = location;
        this.observations = observations;
        this.acquiredAt = acquiredAt;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
    validateCode(code) {
        if (!code || code.trim().length === 0) {
            throw new invalid_tool_exception_1.InvalidToolException('Tool code cannot be empty');
        }
        if (code.length > 50) {
            throw new invalid_tool_exception_1.InvalidToolException('Tool code cannot exceed 50 characters');
        }
    }
    validateName(name) {
        if (!name || name.trim().length === 0) {
            throw new invalid_tool_exception_1.InvalidToolException('Tool name cannot be empty');
        }
        if (name.length > 255) {
            throw new invalid_tool_exception_1.InvalidToolException('Tool name cannot exceed 255 characters');
        }
    }
    getId() { return this.id; }
    getCode() { return this.code; }
    getName() { return this.name; }
    getDescription() { return this.description; }
    getBrand() { return this.brand; }
    getModel() { return this.model; }
    getSerialNumber() { return this.serialNumber; }
    getStatus() { return this.status; }
    getLocation() { return this.location; }
    getObservations() { return this.observations; }
    getAcquiredAt() { return this.acquiredAt; }
    getTenantId() { return this.tenantId; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    getDeletedAt() { return this.deletedAt; }
    changeName(newName) {
        this.validateName(newName);
        this.name = newName;
        this.updatedAt = new Date();
    }
    changeStatus(newStatus) {
        this.status = newStatus;
        this.updatedAt = new Date();
    }
    updateLocation(location) {
        this.location = location;
        this.updatedAt = new Date();
    }
    addObservations(observations) {
        this.observations = observations;
        this.updatedAt = new Date();
    }
    isAvailable() {
        return this.status === tool_status_vo_1.ToolStatus.AVAILABLE;
    }
}
exports.Tool = Tool;
//# sourceMappingURL=tool.entity.js.map