export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  INSPECTIONS = 'INSPECTIONS',
}

export class MaintenanceTypeVO {
  constructor(private readonly value: MaintenanceType) {
    if (!Object.values(MaintenanceType).includes(value)) {
      throw new Error(`Invalid maintenance type: ${value}`);
    }
  }
  getValue(): MaintenanceType { return this.value; }
  equals(other: MaintenanceTypeVO): boolean { return this.value === other.value; }
}
