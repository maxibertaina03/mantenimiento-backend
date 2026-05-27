import type { ProviderServiceType } from '@prisma/client';
export interface RegisterProviderInput {
    name: string;
    taxId?: string | null;
    contactName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    serviceType: ProviderServiceType;
    notes?: string | null;
}
export interface UpdateProviderInput {
    name?: string;
    taxId?: string | null;
    contactName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    serviceType?: ProviderServiceType;
    notes?: string | null;
}
export interface ListProvidersInput {
    page?: number;
    pageSize?: number;
    search?: string;
    serviceType?: ProviderServiceType;
    active?: boolean;
}
