import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { MachineStatus } from '../../domain/value-objects/machine-status.vo';

export class CreateMachineRequestDto {
  @ApiProperty({ description: 'Código único de la máquina', example: 'MAQ-001', minLength: 2, maxLength: 50 })
  @IsString()
  @MinLength(2, { message: 'Machine code must be at least 2 characters long' })
  @MaxLength(50, { message: 'Machine code cannot exceed 50 characters' })
  code!: string;

  @ApiProperty({ description: 'Nombre de la máquina', example: 'Torno CNC', minLength: 3, maxLength: 255 })
  @IsString()
  @MinLength(3, { message: 'Machine name must be at least 3 characters long' })
  @MaxLength(255, { message: 'Machine name cannot exceed 255 characters' })
  name!: string;

  @ApiProperty({ description: 'Marca de la máquina', required: false, example: 'Haas' })
  @IsString()
  @IsOptional()
  brand?: string | null;

  @ApiProperty({ description: 'Modelo de la máquina', required: false, example: 'VF-4' })
  @IsString()
  @IsOptional()
  model?: string | null;

  @ApiProperty({ description: 'Número de serie', required: false })
  @IsString()
  @IsOptional()
  serialNumber?: string | null;

  @ApiProperty({ description: 'Estado inicial', enum: ['ACTIVE', 'MAINTENANCE', 'OUT_OF_SERVICE'], required: false, default: 'ACTIVE' })
  @IsEnum(MachineStatus)
  @IsOptional()
  status?: MachineStatus;

  @ApiProperty({ description: 'Horas de uso acumuladas', required: false, example: 1500 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  usageHours?: number;

  @ApiProperty({ description: 'Ubicación de la máquina', required: false, example: 'Taller A' })
  @IsString()
  @IsOptional()
  location?: string | null;

  @ApiProperty({ description: 'ID del responsable', required: false, format: 'uuid' })
  @IsString()
  @IsOptional()
  responsibleId?: string | null;

  @ApiProperty({ description: 'Notas adicionales', required: false })
  @IsString()
  @IsOptional()
  notes?: string | null;

  @ApiProperty({ description: 'Intervalo de mantenimiento preventivo en horas', required: false, example: 500 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  preventiveIntervalHours?: number | null;
}
