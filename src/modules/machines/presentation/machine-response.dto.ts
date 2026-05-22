import { ApiProperty } from '@nestjs/swagger';
import type { MachineStatus } from '@prisma/client';
import type { Machine } from '../domain/machine.entity';

export class MachineResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) brand!: string | null;
  @ApiProperty({ nullable: true }) model!: string | null;
  @ApiProperty({ nullable: true }) serialNumber!: string | null;
  @ApiProperty({ enum: ['OPERATIONAL', 'INTERNAL_MAINTENANCE', 'EXTERNAL_MAINTENANCE', 'OUT_OF_SERVICE'] })
  status!: MachineStatus;
  @ApiProperty({ description: 'Decimal string (preserva precisión)' }) usageHours!: string;
  @ApiProperty({ nullable: true }) location!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) responsibleId!: string | null;
  @ApiProperty({ nullable: true }) notes!: string | null;
  @ApiProperty({ nullable: true }) preventiveIntervalHours!: string | null;
  @ApiProperty({ nullable: true }) lastPreventiveAtHours!: string | null;
  @ApiProperty() preventiveDue!: boolean;
  @ApiProperty({ nullable: true, description: 'Negativo si está vencido' })
  hoursUntilPreventive!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) tenantId!: string | null;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;
  @ApiProperty({ format: 'date-time' }) updatedAt!: string;

  static from(m: Machine): MachineResponseDto {
    return {
      id: m.id,
      code: m.code,
      name: m.name,
      brand: m.brand,
      model: m.model,
      serialNumber: m.serialNumber,
      status: m.status,
      usageHours: m.usageHours.toString(),
      location: m.location,
      responsibleId: m.responsibleId,
      notes: m.notes,
      preventiveIntervalHours: m.preventive.intervalHours?.toString() ?? null,
      lastPreventiveAtHours: m.preventive.lastDoneAtHours?.toString() ?? null,
      preventiveDue: m.isPreventiveDue(),
      hoursUntilPreventive: m.hoursUntilPreventive()?.toString() ?? null,
      tenantId: m.tenantId,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    };
  }
}

export class PaginatedMachineResponseDto {
  @ApiProperty({ type: [MachineResponseDto] }) items!: MachineResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
}

export class PreventiveAlertDto {
  @ApiProperty({ type: MachineResponseDto }) machine!: MachineResponseDto;
  @ApiProperty({ description: 'Horas que excede el umbral preventivo' })
  overdueByHours!: string;
}
