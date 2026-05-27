"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderPresenterMapper = void 0;
class ProviderPresenterMapper {
    static toResponse(output) {
        return {
            id: output.id,
            name: output.name,
            taxId: output.taxId,
            contactName: output.contactName,
            phone: output.phone,
            email: output.email,
            address: output.address,
            serviceType: output.serviceType,
            notes: output.notes,
            active: output.active,
            createdAt: output.createdAt,
            updatedAt: new Date(),
        };
    }
}
exports.ProviderPresenterMapper = ProviderPresenterMapper;
//# sourceMappingURL=provider-presenter.mapper.js.map