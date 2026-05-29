export enum MachineStatus {
  OPERATIONAL = 'OPERATIONAL',
  INTERNAL_MAINTENANCE = 'INTERNAL_MAINTENANCE',
  EXTERNAL_MAINTENANCE = 'EXTERNAL_MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

export class MachineStatusVO {
  private readonly value: MachineStatus;

  constructor(value: MachineStatus) {
    if (!Object.values(MachineStatus).includes(value)) {
      throw new Error(`Invalid machine status: ${value}`);
    }
    this.value = value;
  }

  getValue(): MachineStatus {
    return this.value;
  }

  isOperational(): boolean {
    return this.value === MachineStatus.OPERATIONAL;
  }

  equals(other: MachineStatusVO): boolean {
    return this.value === other.value;
  }
}
