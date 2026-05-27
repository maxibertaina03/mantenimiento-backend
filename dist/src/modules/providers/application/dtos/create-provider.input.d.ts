import { ProviderServiceType } from '../../domain/value-objects/provider-service-type.vo';
export declare class CreateProviderInput {
    name: string;
    taxId?: string | null;
    contactName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    serviceType?: ProviderServiceType;
    notes?: string | null;
}
