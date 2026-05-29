export declare enum MaintenanceStatus {
    SCHEDULED = "SCHEDULED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class MaintenanceStatusVO {
    private readonly value;
    constructor(value: MaintenanceStatus);
    getValue(): MaintenanceStatus;
    equals(other: MaintenanceStatusVO): boolean;
}
