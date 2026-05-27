export enum ToolStatus {
  AVAILABLE = 'AVAILABLE',
  ON_LOAN = 'ON_LOAN',
  IN_REPAIR = 'IN_REPAIR',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

export class ToolStatusVO {
  private readonly value: ToolStatus;
  constructor(value: ToolStatus) {
    if (!Object.values(ToolStatus).includes(value)) {
      throw new Error(`Invalid tool status: ${value}`);
    }
    this.value = value;
  }
  getValue(): ToolStatus { return this.value; }
  isAvailable(): boolean { return this.value === ToolStatus.AVAILABLE; }
  equals(other: ToolStatusVO): boolean { return this.value === other.value; }
}
