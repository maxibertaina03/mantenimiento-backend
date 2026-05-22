import { ApiProperty } from '@nestjs/swagger';
import type {
  MaintenanceLocation,
  MaintenanceStatus,
  MaintenanceType,
} from '@prisma/client';
import type { MaintenanceOrder } from '../domain/maintenance-order.entity';

export class MaintenanceResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ format: 'uuid' }) machineId!: string;
  @ApiProperty({ enum: ['PREVENTIVE', 'CORRECTIVE'] }) type!: MaintenanceType;
  @ApiProperty({ enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] })
  status!: MaintenanceStatus;
  @ApiProperty({ enum: ['INTERNAL', 'EXTERNAL'] }) location!: MaintenanceLocation;
  @ApiProperty({ nullable: true }) externalLocation!: string | null;
  @ApiProperty({ nullable: true, format: 'date-time' }) scheduledFor!: string | null;
  @ApiProperty({ nullable: true, format: 'date-time' }) startedAt!: string | null;
  @ApiProperty({ nullable: true, format: 'date-time' }) completedAt!: string | null;
  @ApiProperty({ nullable: true }) machineHoursSnapshot!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) technicianId!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) providerId!: string | null;
  @ApiProperty({ nullable: true }) cost!: string | null;
  @ApiProperty({ nullable: true }) currency!: string | null;
  @ApiProperty({ nullable: true }) description!: string | null;
  @ApiProperty({ nullable: true }) observations!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) tenantId!: string | null;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;
  @ApiProperty({ format: 'date-time' }) updatedAt!: string;

  static from(o: MaintenanceOrder): MaintenanceResponseDto {
    return {
      id: o.id,
      machineId: o.machineId,
      type: o.type,
      status: o.status,
      location: o.location,
      externalLocation: o.externalLocation,
      scheduledFor: o.scheduledFor?.toISOString() ?? null,
      startedAt: o.startedAt?.toISOString() ?? null,
      completedAt: o.completedAt?.toISOString() ?? null,
      machineHoursSnapshot: o.machineHoursSnapshot?.toString() ?? null,
      technicianId: o.technicianId,
      providerId: o.providerId,
      cost: o.cost?.toString() ?? null,
      currency: o.currency,
      description: o.description,
      observations: o.observations,
      tenantId: o.tenantId,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    };
  }
}

export class PaginatedMaintenanceResponseDto {
  @ApiProperty({ type: [MaintenanceResponseDto] }) items!: MaintenanceResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
}
