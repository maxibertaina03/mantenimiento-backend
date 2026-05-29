"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidMaintenanceException = void 0;
class InvalidMaintenanceException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidMaintenanceException';
    }
}
exports.InvalidMaintenanceException = InvalidMaintenanceException;
//# sourceMappingURL=invalid-maintenance.exception.js.map