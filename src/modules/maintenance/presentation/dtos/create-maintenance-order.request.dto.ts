import { IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';
import { MaintenanceLocation } from '../../domain/value-objects/maintenance-location.vo';

export class CreateMaintenanceOrderRequestDto {
  @IsString()
  machineId!: string;

  @IsEnum(MaintenanceType)
  type!: MaintenanceType;

  @IsEnum(MaintenanceLocation)
  @IsOptional()
  location?: MaintenanceLocation;

  @IsString()
  @IsOptional()
  externalLocation?: string | null;

  @IsDateString()
  @IsOptional()
  scheduledFor?: string | null;

  @IsString()
  @IsOptional()
  technicianId?: string | null;

  @IsString()
  @IsOptional()
  providerId?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cost?: number | null;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsString()
  @IsOptional()
  observations?: string | null;
}
