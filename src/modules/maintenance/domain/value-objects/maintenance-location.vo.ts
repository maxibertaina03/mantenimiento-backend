export enum MaintenanceLocation {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export class MaintenanceLocationVO {
  constructor(private readonly value: MaintenanceLocation) {
    if (!Object.values(MaintenanceLocation).includes(value)) {
      throw new Error(`Invalid maintenance location: ${value}`);
    }
  }
  getValue(): MaintenanceLocation { return this.value; }
  isExternal(): boolean { return this.value === MaintenanceLocation.EXTERNAL; }
  equals(other: MaintenanceLocationVO): boolean { return this.value === other.value; }
}
