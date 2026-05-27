export enum MaintenanceStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class MaintenanceStatusVO {
  constructor(private readonly value: MaintenanceStatus) {
    if (!Object.values(MaintenanceStatus).includes(value)) {
      throw new Error(`Invalid maintenance status: ${value}`);
    }
  }
  getValue(): MaintenanceStatus { return this.value; }
  isCompleted(): boolean { return this.value === MaintenanceStatus.COMPLETED; }
  equals(other: MaintenanceStatusVO): boolean { return this.value === other.value; }
}
