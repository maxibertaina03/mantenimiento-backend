export declare class MachinesStatsDto {
    total: number;
    operational: number;
    inMaintenance: number;
    outOfService: number;
    preventiveDue: number;
}
export declare class MaintenanceStatsDto {
    pending: number;
    scheduled: number;
    inProgress: number;
    completedLast30d: number;
}
export declare class ToolsStatsDto {
    total: number;
    available: number;
    onLoan: number;
    inRepair: number;
}
export declare class MaterialsStatsDto {
    total: number;
    lowStock: number;
}
export declare class DashboardStatsDto {
    machines: MachinesStatsDto;
    maintenance: MaintenanceStatsDto;
    tools: ToolsStatsDto;
    materials: MaterialsStatsDto;
}
