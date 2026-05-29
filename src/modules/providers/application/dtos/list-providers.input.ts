import type { ProviderServiceType } from '../../domain/value-objects/provider-service-type.vo';

export class ListProvidersInput {
  tenantId?: string | null;
  page?: number;
  pageSize?: number;
  search?: string;
  serviceType?: ProviderServiceType;
  active?: boolean;
}
