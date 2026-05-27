"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProviderMapper = void 0;
const provider_entity_1 = require("../../domain/entities/provider.entity");
class PrismaProviderMapper {
    static toDomain(raw) {
        return new provider_entity_1.Provider(raw.id, raw.name, raw.taxId, raw.contactName, raw.phone, raw.email, raw.address, raw.serviceType, raw.notes, raw.active, raw.tenantId, raw.createdAt, raw.updatedAt, raw.deletedAt);
    }
    static toPersistence(provider) {
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
            tenantId: provider.getTenantId(),
        };
    }
}
exports.PrismaProviderMapper = PrismaProviderMapper;
//# sourceMappingURL=prisma-provider.mapper.js.map