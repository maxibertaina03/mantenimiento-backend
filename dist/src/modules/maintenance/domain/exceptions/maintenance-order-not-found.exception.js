"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceOrderNotFoundException = void 0;
class MaintenanceOrderNotFoundException extends Error {
    constructor(id) {
        super(`Maintenance order with id ${id} not found`);
        this.name = 'MaintenanceOrderNotFoundException';
    }
}
exports.MaintenanceOrderNotFoundException = MaintenanceOrderNotFoundException;
//# sourceMappingURL=maintenance-order-not-found.exception.js.map