export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
}

export class MaintenanceTypeVO {
  private readonly value: MaintenanceType;

  constructor(value: MaintenanceType) {
    if (!Object.values(MaintenanceType).includes(value)) {
      throw new Error(`Invalid maintenance type: ${value}`);
    }
    this.value = value;
  }

  getValue(): MaintenanceType {
    return this.value;
  }

  equals(other: MaintenanceTypeVO): boolean {
    return this.value === other.value;
  }
}
