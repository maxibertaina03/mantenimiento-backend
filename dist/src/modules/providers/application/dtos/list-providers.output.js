"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProvidersOutput = exports.ProviderListItemDto = void 0;
class ProviderListItemDto {
    id;
    name;
    contactName;
    phone;
    email;
    serviceType;
    active;
    createdAt;
}
exports.ProviderListItemDto = ProviderListItemDto;
class ListProvidersOutput {
    items;
    total;
    page;
    pageSize;
}
exports.ListProvidersOutput = ListProvidersOutput;
//# sourceMappingURL=list-providers.output.js.map