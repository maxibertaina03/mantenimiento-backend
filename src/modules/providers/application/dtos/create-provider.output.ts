import { ProviderStatus } from '../../domain/value-objects/provider-status.vo';

export class CreateProviderOutput {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  taxId: string | null;
  status: ProviderStatus;
  createdAt: Date;
}
