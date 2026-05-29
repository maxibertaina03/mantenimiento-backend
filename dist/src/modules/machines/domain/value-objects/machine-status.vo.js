"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineStatusVO = exports.MachineStatus = void 0;
var MachineStatus;
(function (MachineStatus) {
    MachineStatus["OPERATIONAL"] = "OPERATIONAL";
    MachineStatus["INTERNAL_MAINTENANCE"] = "INTERNAL_MAINTENANCE";
    MachineStatus["EXTERNAL_MAINTENANCE"] = "EXTERNAL_MAINTENANCE";
    MachineStatus["OUT_OF_SERVICE"] = "OUT_OF_SERVICE";
})(MachineStatus || (exports.MachineStatus = MachineStatus = {}));
class MachineStatusVO {
    value;
    constructor(value) {
        if (!Object.values(MachineStatus).includes(value)) {
            throw new Error(`Invalid machine status: ${value}`);
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    isOperational() {
        return this.value === MachineStatus.OPERATIONAL;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.MachineStatusVO = MachineStatusVO;
//# sourceMappingURL=machine-status.vo.js.map