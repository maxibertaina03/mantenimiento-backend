import { ApiProperty } from '@nestjs/swagger';

export class MachinesStatsDto {
  @ApiProperty() total!: number;
  @ApiProperty() operational!: number;
  @ApiProperty() inMaintenance!: number;
  @ApiProperty() outOfService!: number;
  @ApiProperty() preventiveDue!: number;
}

export class MaintenanceStatsDto {
  @ApiProperty() pending!: number;
  @ApiProperty() scheduled!: number;
  @ApiProperty() inProgress!: number;
  @ApiProperty() completedLast30d!: number;
}

export class ToolsStatsDto {
  @ApiProperty() total!: number;
  @ApiProperty() available!: number;
  @ApiProperty() onLoan!: number;
  @ApiProperty() inRepair!: number;
}

export class MaterialsStatsDto {
  @ApiProperty() total!: number;
  @ApiProperty() lowStock!: number;
}

export class DashboardStatsDto {
  @ApiProperty({ type: MachinesStatsDto }) machines!: MachinesStatsDto;
  @ApiProperty({ type: MaintenanceStatsDto }) maintenance!: MaintenanceStatsDto;
  @ApiProperty({ type: ToolsStatsDto }) tools!: ToolsStatsDto;
  @ApiProperty({ type: MaterialsStatsDto }) materials!: MaterialsStatsDto;
}
