import { Provider } from '../entities/provider.entity';
import { ProviderServiceType } from '../value-objects/provider-service-type.vo';

export interface ProviderFilters {
  tenantId?: string | null;
  search?: string;
  serviceType?: ProviderServiceType;
  active?: boolean;
}

export interface IProviderRepository {
  save(provider: Provider): Promise<void>;
  findById(id: string): Promise<Provider | null>;
  findByName(name: string): Promise<Provider | null>;
  findAll(filters?: ProviderFilters): Promise<Provider[]>;
  delete(id: string): Promise<void>;
}

export const PROVIDER_REPOSITORY = 'IProviderRepository';
