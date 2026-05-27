import { IsString, IsOptional, IsEnum, IsNumber, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { MachineStatus } from '../../domain/value-objects/machine-status.vo';

export class CreateMachineRequestDto {
  @IsString()
  @MinLength(2, { message: 'Machine code must be at least 2 characters long' })
  @MaxLength(50, { message: 'Machine code cannot exceed 50 characters' })
  code!: string;

  @IsString()
  @MinLength(3, { message: 'Machine name must be at least 3 characters long' })
  @MaxLength(255, { message: 'Machine name cannot exceed 255 characters' })
  name!: string;

  @IsString()
  @IsOptional()
  brand?: string | null;

  @IsString()
  @IsOptional()
  model?: string | null;

  @IsString()
  @IsOptional()
  serialNumber?: string | null;

  @IsEnum(MachineStatus)
  @IsOptional()
  status?: MachineStatus;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  usageHours?: number;

  @IsString()
  @IsOptional()
  location?: string | null;

  @IsString()
  @IsOptional()
  responsibleId?: string | null;

  @IsString()
  @IsOptional()
  notes?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  preventiveIntervalHours?: number | null;
}
