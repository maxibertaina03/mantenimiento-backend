import type { ProviderServiceType } from '@prisma/client';
import type { Provider } from '../domain/provider.entity';
export declare class ProviderResponseDto {
    id: string;
    name: string;
    taxId: string | null;
    contactName: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    serviceType: ProviderServiceType;
    notes: string | null;
    active: boolean;
    tenantId: string | null;
    createdAt: string;
    updatedAt: string;
    static from(p: Provider): ProviderResponseDto;
}
export declare class PaginatedProviderResponseDto {
    items: ProviderResponseDto[];
    total: number;
    page: number;
    pageSize: number;
}
