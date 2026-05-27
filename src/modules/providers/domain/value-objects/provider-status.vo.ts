export enum ProviderStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class ProviderStatusVO {
  private readonly value: ProviderStatus;

  constructor(value: ProviderStatus) {
    if (!Object.values(ProviderStatus).includes(value)) {
      throw new Error(`Invalid provider status: ${value}`);
    }
    this.value = value;
  }

  getValue(): ProviderStatus {
    return this.value;
  }

  isActive(): boolean {
    return this.value === ProviderStatus.ACTIVE;
  }

  equals(other: ProviderStatusVO): boolean {
    return this.value === other.value;
  }
}
