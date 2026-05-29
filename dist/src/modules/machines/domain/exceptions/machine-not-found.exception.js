"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineNotFoundException = void 0;
class MachineNotFoundException extends Error {
    constructor(id) {
        super(`Machine with id ${id} not found`);
        this.name = 'MachineNotFoundException';
    }
}
exports.MachineNotFoundException = MachineNotFoundException;
//# sourceMappingURL=machine-not-found.exception.js.map