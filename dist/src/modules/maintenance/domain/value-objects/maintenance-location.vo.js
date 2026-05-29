"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceLocationVO = exports.MaintenanceLocation = void 0;
var MaintenanceLocation;
(function (MaintenanceLocation) {
    MaintenanceLocation["INTERNAL"] = "INTERNAL";
    MaintenanceLocation["EXTERNAL"] = "EXTERNAL";
})(MaintenanceLocation || (exports.MaintenanceLocation = MaintenanceLocation = {}));
class MaintenanceLocationVO {
    value;
    constructor(value) {
        if (!Object.values(MaintenanceLocation).includes(value)) {
            throw new Error(`Invalid maintenance location: ${value}`);
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
exports.MaintenanceLocationVO = MaintenanceLocationVO;
//# sourceMappingURL=maintenance-location.vo.js.map