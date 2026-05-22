import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Min,
  Max,
} from 'class-validator';
import { MachineStatus } from '@prisma/client';

const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/;

export class CreateMachineDto {
  @ApiProperty({ minLength: 2, maxLength: 32 })
  @IsString()
  @Length(2, 32)
  code!: string;

  @ApiProperty({ minLength: 2, maxLength: 120 })
  @IsString()
  @Length(2, 120)
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  brand?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  model?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  serialNumber?: string | null;

  @ApiPropertyOptional({ description: 'Horas iniciales (decimal)', example: '0' })
  @IsOptional()
  @Matches(DECIMAL_REGEX, { message: 'initialUsageHours debe ser decimal con hasta 2 decimales' })
  initialUsageHours?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string | null;

  @ApiPropertyOptional({ nullable: true, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  responsibleId?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string | null;

  @ApiPropertyOptional({ nullable: true, description: 'Intervalo preventivo (horas)' })
  @IsOptional()
  @Matches(DECIMAL_REGEX, { message: 'preventiveIntervalHours debe ser decimal' })
  preventiveIntervalHours?: string | null;
}

export class UpdateMachineDto extends PartialType(CreateMachineDto) {}

export class ChangeMachineStatusDto {
  @ApiProperty({ enum: MachineStatus })
  @IsEnum(MachineStatus)
  status!: MachineStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}

export class LogMachineHoursDto {
  @ApiProperty({ description: 'Lectura nueva del contador de horas (decimal)', example: '1250.50' })
  @IsNumberString({ no_symbols: false })
  @Matches(DECIMAL_REGEX, { message: 'hoursAfter debe ser decimal' })
  hoursAfter!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string | null;
}

export class ListMachinesQueryDto {
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

  @ApiPropertyOptional({ enum: MachineStatus })
  @IsOptional()
  @IsEnum(MachineStatus)
  status?: MachineStatus;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  responsibleId?: string;

  @ApiPropertyOptional({ description: 'Búsqueda por code/name/serialNumber' })
  @IsOptional()
  @IsString()
  search?: string;
}
