"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderAppMapper = void 0;
class ProviderAppMapper {
    static toOutput(provider) {
        return {
            id: provider.getId(),
            name: provider.getName(),
            taxId: provider.getTaxId(),
            contactName: provider.getContactName(),
            phone: provider.getPhone(),
            email: provider.getEmail(),
            address: provider.getAddress(),
            serviceType: provider.getServiceType(),
            notes: provider.getNotes(),
            active: provider.isActive(),
            createdAt: provider.getCreatedAt(),
        };
    }
}
exports.ProviderAppMapper = ProviderAppMapper;
//# sourceMappingURL=provider-app.mapper.js.map