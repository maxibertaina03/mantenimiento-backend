import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMaterialRequestDto {
  @ApiProperty({ description: 'Nombre del material', required: false, example: 'Acero inoxidable' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Ubicación del material', required: false, example: 'Bodega A' })
  @IsOptional()
  @IsString()
  location?: string | null;
}
