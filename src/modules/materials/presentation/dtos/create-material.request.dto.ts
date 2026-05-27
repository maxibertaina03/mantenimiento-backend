import { IsString, IsOptional, IsEnum, IsNumber, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { MaterialUnit } from '../../domain/value-objects/material-unit.vo';

export class CreateMaterialRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name!: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsEnum(MaterialUnit)
  @IsOptional()
  unit?: MaterialUnit;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  stock?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minStock?: number;

  @IsString()
  @IsOptional()
  location?: string | null;
}
