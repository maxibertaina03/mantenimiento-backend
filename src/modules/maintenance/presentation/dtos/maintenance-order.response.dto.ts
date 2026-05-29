import { ApiProperty } from '@nestjs/swagger';
import { MaintenanceStatus } from '../../domain/value-objects/maintenance-status.vo';
import { MaintenanceType } from '../../domain/value-objects/maintenance-type.vo';
import { MaintenanceLocation } from '../../domain/value-objects/maintenance-location.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class MaintenanceOrderResponseDto {
  @ApiProperty({ description: 'ID único de la orden de mantenimiento', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'ID de la máquina', format: 'uuid' })
  machineId!: string;

  @ApiProperty({ description: 'Tipo de mantenimiento', enum: Object.values(MaintenanceType) })
  type!: MaintenanceType;

  @ApiProperty({ description: 'Estado actual de la orden', enum: Object.values(MaintenanceStatus) })
  status!: MaintenanceStatus;

  @ApiProperty({ description: 'Ubicación del mantenimiento', enum: Object.values(MaintenanceLocation) })
  location!: MaintenanceLocation;

  @ApiProperty({ description: 'Costo del mantenimiento', nullable: true, type: 'number' })
  cost!: Decimal | null;

  @ApiProperty({ description: 'Fecha de creación', format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ description: 'Última actualización', format: 'date-time' })
  updatedAt!: Date;
}
