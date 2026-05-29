"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceTypeVO = exports.MaintenanceType = void 0;
var MaintenanceType;
(function (MaintenanceType) {
    MaintenanceType["PREVENTIVE"] = "PREVENTIVE";
    MaintenanceType["CORRECTIVE"] = "CORRECTIVE";
})(MaintenanceType || (exports.MaintenanceType = MaintenanceType = {}));
class MaintenanceTypeVO {
    value;
    constructor(value) {
        if (!Object.values(MaintenanceType).includes(value)) {
            throw new Error(`Invalid maintenance type: ${value}`);
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.MaintenanceTypeVO = MaintenanceTypeVO;
//# sourceMappingURL=maintenance-type.vo.js.map