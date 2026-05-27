import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDate, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ToolStatus } from '../../domain/value-objects/tool-status.vo';

export class CreateToolRequestDto {
  @ApiProperty({ description: 'Código único', example: 'TOOL-001', minLength: 2, maxLength: 50 })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code!: string;

  @ApiProperty({
    description: 'Nombre de la herramienta',
    example: 'Destornillador Phillips',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name!: string;

  @ApiProperty({ description: 'Descripción', required: false })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ description: 'Marca', required: false, example: 'Stanley' })
  @IsString()
  @IsOptional()
  brand?: string | null;

  @ApiProperty({ description: 'Modelo', required: false })
  @IsString()
  @IsOptional()
  model?: string | null;

  @ApiProperty({ description: 'Número de serie', required: false })
  @IsString()
  @IsOptional()
  serialNumber?: string | null;

  @ApiProperty({
    description: 'Estado inicial',
    enum: ['AVAILABLE', 'ON_LOAN', 'IN_REPAIR', 'OUT_OF_SERVICE'],
    required: false,
    default: 'AVAILABLE',
  })
  @IsEnum(ToolStatus)
  @IsOptional()
  status?: ToolStatus;

  @ApiProperty({ description: 'Ubicación', required: false })
  @IsString()
  @IsOptional()
  location?: string | null;

  @ApiProperty({ description: 'Observaciones', required: false })
  @IsString()
  @IsOptional()
  observations?: string | null;

  @ApiProperty({ description: 'Fecha de adquisición', format: 'date-time', required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  acquiredAt?: Date | null;
}
