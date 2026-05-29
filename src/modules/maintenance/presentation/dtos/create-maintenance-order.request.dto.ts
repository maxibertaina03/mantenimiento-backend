import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';
import { MaintenanceLocation } from '../../domain/value-objects/maintenance-location.vo';

export class CreateMaintenanceOrderRequestDto {
  @ApiProperty({ description: 'ID de la máquina a mantener', format: 'uuid' })
  @IsString()
  machineId!: string;

  @ApiProperty({ description: 'Tipo de mantenimiento', enum: Object.values(MaintenanceType) })
  @IsEnum(MaintenanceType)
  type!: MaintenanceType;

  @ApiProperty({ description: 'Ubicación del mantenimiento', enum: Object.values(MaintenanceLocation), required: false })
  @IsEnum(MaintenanceLocation)
  @IsOptional()
  location?: MaintenanceLocation;

  @ApiProperty({ description: 'Ubicación externa (si aplica)', required: false })
  @IsString()
  @IsOptional()
  externalLocation?: string | null;

  @ApiProperty({ description: 'Fecha programada para el mantenimiento', format: 'date-time', required: false })
  @IsDateString()
  @IsOptional()
  scheduledFor?: string | null;

  @ApiProperty({ description: 'ID del técnico responsable', format: 'uuid', required: false })
  @IsString()
  @IsOptional()
  technicianId?: string | null;

  @ApiProperty({ description: 'ID del proveedor (si es mantenimiento externo)', format: 'uuid', required: false })
  @IsString()
  @IsOptional()
  providerId?: string | null;

  @ApiProperty({ description: 'Costo del mantenimiento', required: false, example: 500 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cost?: number | null;

  @ApiProperty({ description: 'Moneda del costo', required: false, example: 'USD', default: 'USD' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ description: 'Descripción del mantenimiento', required: false })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ description: 'Observaciones adicionales', required: false })
  @IsString()
  @IsOptional()
  observations?: string | null;
}
