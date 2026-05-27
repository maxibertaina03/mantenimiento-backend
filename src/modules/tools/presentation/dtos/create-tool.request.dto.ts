import { IsString, IsOptional, IsEnum, IsDate, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ToolStatus } from '../../domain/value-objects/tool-status.vo';

export class CreateToolRequestDto {
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

  @IsString()
  @IsOptional()
  brand?: string | null;

  @IsString()
  @IsOptional()
  model?: string | null;

  @IsString()
  @IsOptional()
  serialNumber?: string | null;

  @IsEnum(ToolStatus)
  @IsOptional()
  status?: ToolStatus;

  @IsString()
  @IsOptional()
  location?: string | null;

  @IsString()
  @IsOptional()
  observations?: string | null;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  acquiredAt?: Date | null;
}
