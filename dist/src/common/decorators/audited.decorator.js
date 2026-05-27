"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audited = exports.AUDITED_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.AUDITED_KEY = 'audited';
const Audited = (meta) => (0, common_1.SetMetadata)(exports.AUDITED_KEY, meta);
exports.Audited = Audited;
//# sourceMappingURL=audited.decorator.js.map