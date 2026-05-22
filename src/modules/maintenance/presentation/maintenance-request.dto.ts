import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  Max,
} from 'class-validator';
import {
  MaintenanceLocation,
  MaintenanceStatus,
  MaintenanceType,
} from '@prisma/client';

const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/;

export class ScheduleMaintenanceDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  machineId!: string;

  @ApiProperty({ enum: MaintenanceType })
  @IsEnum(MaintenanceType)
  type!: MaintenanceType;

  @ApiProperty({ enum: MaintenanceLocation })
  @IsEnum(MaintenanceLocation)
  location!: MaintenanceLocation;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  externalLocation?: string | null;

  @ApiPropertyOptional({ nullable: true, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  scheduledFor?: string | null;

  @ApiPropertyOptional({ nullable: true, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  technicianId?: string | null;

  @ApiPropertyOptional({ nullable: true, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  providerId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class UpdateMaintenanceDto {
  @ApiPropertyOptional({ enum: MaintenanceLocation })
  @IsOptional()
  @IsEnum(MaintenanceLocation)
  location?: MaintenanceLocation;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  externalLocation?: string | null;

  @ApiPropertyOptional({ nullable: true, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  scheduledFor?: string | null;

  @ApiPropertyOptional({ nullable: true, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  technicianId?: string | null;

  @ApiPropertyOptional({ nullable: true, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  providerId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  observations?: string | null;
}

export class CompleteMaintenanceDto {
  @ApiProperty({ description: 'Horas del contador al cierre del mantenimiento', example: '1200.50' })
  @Matches(DECIMAL_REGEX, { message: 'machineHoursSnapshot debe ser decimal' })
  machineHoursSnapshot!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @Matches(DECIMAL_REGEX, { message: 'cost debe ser decimal' })
  cost?: string | null;

  @ApiPropertyOptional({ default: 'ARS', maxLength: 8 })
  @IsOptional()
  @IsString()
  currency?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  observations?: string | null;
}

export class CancelMaintenanceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}

export class ListMaintenanceQueryDto {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 20 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  machineId?: string;

  @ApiPropertyOptional({ enum: MaintenanceStatus })
  @IsOptional()
  @IsEnum(MaintenanceStatus)
  status?: MaintenanceStatus;

  @ApiPropertyOptional({ enum: MaintenanceType })
  @IsOptional()
  @IsEnum(MaintenanceType)
  type?: MaintenanceType;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  technicianId?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  providerId?: string;

  @ApiPropertyOptional({ format: 'date-time' })
  @IsOptional()
  @IsDateString()
  scheduledFrom?: string;

  @ApiPropertyOptional({ format: 'date-time' })
  @IsOptional()
  @IsDateString()
  scheduledTo?: string;
}
