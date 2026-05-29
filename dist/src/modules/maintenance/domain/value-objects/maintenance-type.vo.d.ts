export declare enum MaintenanceType {
    PREVENTIVE = "PREVENTIVE",
    CORRECTIVE = "CORRECTIVE"
}
export declare class MaintenanceTypeVO {
    private readonly value;
    constructor(value: MaintenanceType);
    getValue(): MaintenanceType;
    equals(other: MaintenanceTypeVO): boolean;
}
