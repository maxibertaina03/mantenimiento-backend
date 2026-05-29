"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolStatusVO = exports.ToolStatus = void 0;
var ToolStatus;
(function (ToolStatus) {
    ToolStatus["AVAILABLE"] = "AVAILABLE";
    ToolStatus["ON_LOAN"] = "ON_LOAN";
    ToolStatus["IN_REPAIR"] = "IN_REPAIR";
    ToolStatus["OUT_OF_SERVICE"] = "OUT_OF_SERVICE";
})(ToolStatus || (exports.ToolStatus = ToolStatus = {}));
class ToolStatusVO {
    value;
    constructor(value) {
        if (!Object.values(ToolStatus).includes(value)) {
            throw new Error(`Invalid tool status: ${value}`);
        }
        this.value = value;
    }
    getValue() { return this.value; }
    isAvailable() { return this.value === ToolStatus.AVAILABLE; }
    equals(other) { return this.value === other.value; }
}
exports.ToolStatusVO = ToolStatusVO;
//# sourceMappingURL=tool-status.vo.js.map