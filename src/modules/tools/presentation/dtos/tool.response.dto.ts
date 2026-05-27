import { ApiProperty } from '@nestjs/swagger';
import { ToolStatus } from '../../domain/value-objects/tool-status.vo';

export class ToolResponseDto {
  @ApiProperty({ description: 'ID único de la herramienta', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'Código único de la herramienta', example: 'TOOL-001' })
  code!: string;

  @ApiProperty({ description: 'Nombre de la herramienta', example: 'Destornillador Phillips' })
  name!: string;

  @ApiProperty({ description: 'Descripción de la herramienta', nullable: true })
  description!: string | null;

  @ApiProperty({ description: 'Marca de la herramienta', nullable: true, example: 'Stanley' })
  brand!: string | null;

  @ApiProperty({ description: 'Modelo de la herramienta', nullable: true })
  model!: string | null;

  @ApiProperty({ description: 'Número de serie', nullable: true })
  serialNumber!: string | null;

  @ApiProperty({
    description: 'Estado de la herramienta',
    enum: ['AVAILABLE', 'ON_LOAN', 'IN_REPAIR', 'OUT_OF_SERVICE'],
  })
  status!: ToolStatus;

  @ApiProperty({ description: 'Ubicación de la herramienta', nullable: true })
  location!: string | null;

  @ApiProperty({ description: 'Observaciones', nullable: true })
  observations!: string | null;

  @ApiProperty({ description: 'Fecha de adquisición', format: 'date-time', nullable: true })
  acquiredAt!: Date | null;

  @ApiProperty({ description: 'Fecha de creación', format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ description: 'Última actualización', format: 'date-time' })
  updatedAt!: Date;
}
