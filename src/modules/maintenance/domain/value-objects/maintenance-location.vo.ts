export enum MaintenanceLocation {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export class MaintenanceLocationVO {
  private readonly value: MaintenanceLocation;

  constructor(value: MaintenanceLocation) {
    if (!Object.values(MaintenanceLocation).includes(value)) {
      throw new Error(`Invalid maintenance location: ${value}`);
    }
    this.value = value;
  }

  getValue(): MaintenanceLocation {
    return this.value;
  }

  equals(other: MaintenanceLocationVO): boolean {
    return this.value === other.value;
  }
}
