export declare enum MaintenanceLocation {
    INTERNAL = "INTERNAL",
    EXTERNAL = "EXTERNAL"
}
export declare class MaintenanceLocationVO {
    private readonly value;
    constructor(value: MaintenanceLocation);
    getValue(): MaintenanceLocation;
    equals(other: MaintenanceLocationVO): boolean;
}
