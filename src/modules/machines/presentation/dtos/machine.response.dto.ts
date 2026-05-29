import { ApiProperty } from '@nestjs/swagger';
import { MachineStatus } from '../../domain/value-objects/machine-status.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class MachineResponseDto {
  @ApiProperty({ description: 'ID único de la máquina', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'Código único de la máquina', example: 'MAQ-001' })
  code!: string;

  @ApiProperty({ description: 'Nombre de la máquina', example: 'Torno CNC' })
  name!: string;

  @ApiProperty({ description: 'Marca de la máquina', nullable: true, example: 'Haas' })
  brand!: string | null;

  @ApiProperty({ description: 'Modelo de la máquina', nullable: true, example: 'VF-4' })
  model!: string | null;

  @ApiProperty({ description: 'Número de serie', nullable: true })
  serialNumber!: string | null;

  @ApiProperty({ description: 'Estado actual', enum: ['ACTIVE', 'MAINTENANCE', 'OUT_OF_SERVICE'] })
  status!: MachineStatus;

  @ApiProperty({ description: 'Horas de uso acumuladas', type: 'number' })
  usageHours!: Decimal;

  @ApiProperty({ description: 'Ubicación de la máquina', nullable: true, example: 'Taller A' })
  location!: string | null;

  @ApiProperty({ description: 'ID del responsable', nullable: true, format: 'uuid' })
  responsibleId!: string | null;

  @ApiProperty({ description: 'Notas adicionales', nullable: true })
  notes!: string | null;

  @ApiProperty({ description: 'Intervalo de mantenimiento preventivo en horas', nullable: true, type: 'number' })
  preventiveIntervalHours!: Decimal | null;

  @ApiProperty({ description: 'Horas en las que se realizó el último mantenimiento preventivo', nullable: true, type: 'number' })
  lastPreventiveAtHours!: Decimal | null;

  @ApiProperty({ description: 'Fecha de creación', format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ description: 'Última actualización', format: 'date-time' })
  updatedAt!: Date;
}
