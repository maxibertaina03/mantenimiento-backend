"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialNotFoundException = void 0;
class MaterialNotFoundException extends Error {
    constructor(id) {
        super(`Material with id ${id} not found`);
        this.name = 'MaterialNotFoundException';
    }
}
exports.MaterialNotFoundException = MaterialNotFoundException;
//# sourceMappingURL=material-not-found.exception.js.map