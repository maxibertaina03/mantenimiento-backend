"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidProviderException = void 0;
class InvalidProviderException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidProviderException';
    }
}
exports.InvalidProviderException = InvalidProviderException;
//# sourceMappingURL=invalid-provider.exception.js.map