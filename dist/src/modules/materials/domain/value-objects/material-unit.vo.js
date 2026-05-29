"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialUnitVO = exports.MaterialUnit = void 0;
var MaterialUnit;
(function (MaterialUnit) {
    MaterialUnit["UNIT"] = "UNIT";
    MaterialUnit["METER"] = "METER";
    MaterialUnit["LITER"] = "LITER";
    MaterialUnit["KILOGRAM"] = "KILOGRAM";
    MaterialUnit["PAIR"] = "PAIR";
})(MaterialUnit || (exports.MaterialUnit = MaterialUnit = {}));
class MaterialUnitVO {
    value;
    constructor(value) {
        this.value = value;
        if (!Object.values(MaterialUnit).includes(value))
            throw new Error(`Invalid material unit: ${value}`);
    }
    getValue() { return this.value; }
    equals(other) { return this.value === other.value; }
}
exports.MaterialUnitVO = MaterialUnitVO;
//# sourceMappingURL=material-unit.vo.js.map