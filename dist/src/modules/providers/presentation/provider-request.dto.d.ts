import { ProviderServiceType } from '@prisma/client';
export declare class CreateProviderDto {
    name: string;
    taxId?: string | null;
    contactName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    serviceType: ProviderServiceType;
    notes?: string | null;
}
declare const UpdateProviderDto_base: import("@nestjs/common").Type<Partial<CreateProviderDto>>;
export declare class UpdateProviderDto extends UpdateProviderDto_base {
}
export declare class ToggleActiveProviderDto {
    active: boolean;
}
export declare class ListProvidersQueryDto {
    page?: number;
    pageSize?: number;
    search?: string;
    serviceType?: ProviderServiceType;
    active?: boolean;
}
export {};
