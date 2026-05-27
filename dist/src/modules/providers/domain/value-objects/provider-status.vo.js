"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderServiceTypeVO = exports.ProviderServiceType = void 0;
var ProviderServiceType;
(function (ProviderServiceType) {
    ProviderServiceType["MAINTENANCE"] = "MAINTENANCE";
    ProviderServiceType["PARTS"] = "PARTS";
    ProviderServiceType["TOOLS"] = "TOOLS";
    ProviderServiceType["MATERIALS"] = "MATERIALS";
    ProviderServiceType["CONSULTING"] = "CONSULTING";
    ProviderServiceType["OTHER"] = "OTHER";
})(ProviderServiceType || (exports.ProviderServiceType = ProviderServiceType = {}));
class ProviderServiceTypeVO {
    value;
    constructor(value) {
        if (!Object.values(ProviderServiceType).includes(value)) {
            throw new Error(`Invalid provider service type: ${value}`);
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
exports.ProviderServiceTypeVO = ProviderServiceTypeVO;
//# sourceMappingURL=provider-status.vo.js.map