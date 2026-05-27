import { ProviderServiceType } from '../../domain/value-objects/provider-service-type.vo';

export class ProviderListItemDto {
  id!: string;
  name!: string;
  contactName?: string | null;
  phone?: string | null;
  email?: string | null;
  serviceType!: ProviderServiceType;
  active!: boolean;
  createdAt!: Date;
}

export class ListProvidersOutput {
  items!: ProviderListItemDto[];
  total!: number;
  page!: number;
  pageSize!: number;
}
