import { ApiProperty } from '@nestjs/swagger';
import { MaterialUnit } from '../../domain/value-objects/material-unit.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class MaterialResponseDto {
  @ApiProperty({ description: 'ID único del material', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'Código único del material', example: 'MAT-001' })
  code!: string;

  @ApiProperty({ description: 'Nombre del material', example: 'Acero inoxidable' })
  name!: string;

  @ApiProperty({ description: 'Descripción del material', nullable: true })
  description!: string | null;

  @ApiProperty({ description: 'Unidad de medida', enum: Object.values(MaterialUnit) })
  unit!: MaterialUnit;

  @ApiProperty({ description: 'Stock actual', type: 'number' })
  stock!: Decimal;

  @ApiProperty({ description: 'Stock mínimo requerido', type: 'number' })
  minStock!: Decimal;

  @ApiProperty({ description: 'Ubicación del material', nullable: true, example: 'Bodega A' })
  location!: string | null;

  @ApiProperty({ description: 'Fecha de creación', format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ description: 'Última actualización', format: 'date-time' })
  updatedAt!: Date;
}
