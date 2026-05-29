export declare enum ToolStatus {
    AVAILABLE = "AVAILABLE",
    ON_LOAN = "ON_LOAN",
    IN_REPAIR = "IN_REPAIR",
    OUT_OF_SERVICE = "OUT_OF_SERVICE"
}
export declare class ToolStatusVO {
    private readonly value;
    constructor(value: ToolStatus);
    getValue(): ToolStatus;
    isAvailable(): boolean;
    equals(other: ToolStatusVO): boolean;
}
