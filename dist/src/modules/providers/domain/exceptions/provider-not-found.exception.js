"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderNotFoundException = void 0;
class ProviderNotFoundException extends Error {
    constructor(id) {
        super(`Provider with id ${id} not found`);
        this.name = 'ProviderNotFoundException';
    }
}
exports.ProviderNotFoundException = ProviderNotFoundException;
//# sourceMappingURL=provider-not-found.exception.js.map