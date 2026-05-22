import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MaterialUnit, StockMovementType } from '@prisma/client';

const DECIMAL_REGEX = /^\d+(\.\d{1,4})?$/;

export class CreateMaterialDto {
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
  description?: string | null;

  @ApiProperty({ enum: MaterialUnit })
  @IsEnum(MaterialUnit)
  unit!: MaterialUnit;

  @ApiPropertyOptional({ default: '0' })
  @IsOptional()
  @Matches(DECIMAL_REGEX)
  initialStock?: string;

  @ApiPropertyOptional({ default: '0' })
  @IsOptional()
  @Matches(DECIMAL_REGEX)
  minStock?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string | null;
}

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}

export class RegisterMovementDto {
  @ApiProperty({ enum: StockMovementType })
  @IsEnum(StockMovementType)
  type!: StockMovementType;

  @ApiProperty({ description: 'Cantidad positiva (decimal hasta 4 decimales)', example: '12.5' })
  @Matches(DECIMAL_REGEX)
  quantity!: string;

  @ApiPropertyOptional({ description: 'Sólo para ADJUSTMENT: 1 (suma) o -1 (resta)', enum: [1, -1] })
  @IsOptional()
  @IsIn([1, -1])
  adjustmentSign?: 1 | -1;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  reason?: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  reference?: string | null;
}

export class ListMaterialsQueryDto {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  lowStockOnly?: boolean;
}
