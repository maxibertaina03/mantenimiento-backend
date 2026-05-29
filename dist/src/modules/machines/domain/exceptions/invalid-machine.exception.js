"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidMachineException = void 0;
class InvalidMachineException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidMachineException';
    }
}
exports.InvalidMachineException = InvalidMachineException;
//# sourceMappingURL=invalid-machine.exception.js.map