export enum MaintenanceStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class MaintenanceStatusVO {
  private readonly value: MaintenanceStatus;

  constructor(value: MaintenanceStatus) {
    if (!Object.values(MaintenanceStatus).includes(value)) {
      throw new Error(`Invalid maintenance status: ${value}`);
    }
    this.value = value;
  }

  getValue(): MaintenanceStatus {
    return this.value;
  }

  equals(other: MaintenanceStatusVO): boolean {
    return this.value === other.value;
  }
}
