"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceStatusVO = exports.MaintenanceStatus = void 0;
var MaintenanceStatus;
(function (MaintenanceStatus) {
    MaintenanceStatus["SCHEDULED"] = "SCHEDULED";
    MaintenanceStatus["IN_PROGRESS"] = "IN_PROGRESS";
    MaintenanceStatus["COMPLETED"] = "COMPLETED";
    MaintenanceStatus["CANCELLED"] = "CANCELLED";
})(MaintenanceStatus || (exports.MaintenanceStatus = MaintenanceStatus = {}));
class MaintenanceStatusVO {
    value;
    constructor(value) {
        if (!Object.values(MaintenanceStatus).includes(value)) {
            throw new Error(`Invalid maintenance status: ${value}`);
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
exports.MaintenanceStatusVO = MaintenanceStatusVO;
//# sourceMappingURL=maintenance-status.vo.js.map