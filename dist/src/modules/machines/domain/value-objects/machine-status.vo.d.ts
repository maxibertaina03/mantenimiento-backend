export declare enum MachineStatus {
    OPERATIONAL = "OPERATIONAL",
    INTERNAL_MAINTENANCE = "INTERNAL_MAINTENANCE",
    EXTERNAL_MAINTENANCE = "EXTERNAL_MAINTENANCE",
    OUT_OF_SERVICE = "OUT_OF_SERVICE"
}
export declare class MachineStatusVO {
    private readonly value;
    constructor(value: MachineStatus);
    getValue(): MachineStatus;
    isOperational(): boolean;
    equals(other: MachineStatusVO): boolean;
}
