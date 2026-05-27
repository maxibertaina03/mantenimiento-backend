export enum ProviderServiceType {
  MAINTENANCE = 'MAINTENANCE',
  PARTS = 'PARTS',
  TOOLS = 'TOOLS',
  MATERIALS = 'MATERIALS',
  CONSULTING = 'CONSULTING',
  OTHER = 'OTHER',
}

export class ProviderServiceTypeVO {
  private readonly value: ProviderServiceType;

  constructor(value: ProviderServiceType) {
    if (!Object.values(ProviderServiceType).includes(value)) {
      throw new Error(`Invalid provider service type: ${value}`);
    }
    this.value = value;
  }

  getValue(): ProviderServiceType {
    return this.value;
  }

  equals(other: ProviderServiceTypeVO): boolean {
    return this.value === other.value;
  }
}
