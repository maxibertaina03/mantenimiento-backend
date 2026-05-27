import type { ProviderServiceType } from '@prisma/client';
import type { Provider } from './provider.entity';
export interface CreateProviderProps {
    name: string;
    taxId?: string | null;
    contactName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    serviceType: ProviderServiceType;
    notes?: string | null;
    tenantId?: string | null;
}
export interface ListProvidersQuery {
    skip?: number;
    take?: number;
    search?: string;
    serviceType?: ProviderServiceType;
    active?: boolean;
}
export interface ProviderRepository {
    create(props: CreateProviderProps): Promise<Provider>;
    findById(id: string): Promise<Provider | null>;
    findByTaxId(taxId: string): Promise<Provider | null>;
    list(query: ListProvidersQuery): Promise<{
        items: Provider[];
        total: number;
    }>;
    save(provider: Provider): Promise<Provider>;
    softDelete(id: string): Promise<void>;
}
export declare const PROVIDER_REPOSITORY: unique symbol;
