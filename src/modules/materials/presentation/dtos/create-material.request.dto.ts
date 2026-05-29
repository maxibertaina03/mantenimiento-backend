import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { MaterialUnit } from '../../domain/value-objects/material-unit.vo';

export class CreateMaterialRequestDto {
  @ApiProperty({ description: 'Código único del material', example: 'MAT-001', minLength: 2, maxLength: 50 })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code!: string;

  @ApiProperty({ description: 'Nombre del material', example: 'Acero inoxidable', minLength: 3, maxLength: 255 })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name!: string;

  @ApiProperty({ description: 'Descripción del material', required: false })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ description: 'Unidad de medida', enum: Object.values(MaterialUnit), required: false })
  @IsEnum(MaterialUnit)
  @IsOptional()
  unit?: MaterialUnit;

  @ApiProperty({ description: 'Stock actual', required: false, example: 100 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  stock?: number;

  @ApiProperty({ description: 'Stock mínimo requerido', required: false, example: 20 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minStock?: number;

  @ApiProperty({ description: 'Ubicación del material', required: false, example: 'Bodega A' })
  @IsString()
  @IsOptional()
  location?: string | null;
}
