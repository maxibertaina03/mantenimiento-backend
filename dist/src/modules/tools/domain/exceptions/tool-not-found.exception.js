"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolNotFoundException = void 0;
class ToolNotFoundException extends Error {
    constructor(id) {
        super(`Tool with id ${id} not found`);
        this.name = 'ToolNotFoundException';
    }
}
exports.ToolNotFoundException = ToolNotFoundException;
//# sourceMappingURL=tool-not-found.exception.js.map