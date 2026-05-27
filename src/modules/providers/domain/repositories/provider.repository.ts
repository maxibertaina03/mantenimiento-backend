import { Provider } from '../entities/provider.entity';

export interface IProviderRepository {
  save(provider: Provider): Promise<void>;
  findById(id: string): Promise<Provider | null>;
  findByName(name: string): Promise<Provider | null>;
  findAll(tenantId?: string | null): Promise<Provider[]>;
  delete(id: string): Promise<void>;
}

export const PROVIDER_REPOSITORY = 'IProviderRepository';
