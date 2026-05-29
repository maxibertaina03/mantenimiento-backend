"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidToolException = void 0;
class InvalidToolException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidToolException';
    }
}
exports.InvalidToolException = InvalidToolException;
//# sourceMappingURL=invalid-tool.exception.js.map