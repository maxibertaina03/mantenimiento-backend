"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidMaterialException = void 0;
class InvalidMaterialException extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidMaterialException';
    }
}
exports.InvalidMaterialException = InvalidMaterialException;
//# sourceMappingURL=invalid-material.exception.js.map