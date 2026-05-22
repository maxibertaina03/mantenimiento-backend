import { ApiProperty } from '@nestjs/swagger';
import type { UsageLogEntry } from '../domain/machine.repository';

export class UsageLogResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ format: 'uuid' }) machineId!: string;
  @ApiProperty() hoursBefore!: string;
  @ApiProperty() hoursAfter!: string;
  @ApiProperty() delta!: string;
  @ApiProperty({ nullable: true }) notes!: string | null;
  @ApiProperty({ format: 'uuid' }) createdById!: string;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;

  static from(log: UsageLogEntry): UsageLogResponseDto {
    return {
      id: log.id,
      machineId: log.machineId,
      hoursBefore: log.hoursBefore.toString(),
      hoursAfter: log.hoursAfter.toString(),
      delta: log.delta.toString(),
      notes: log.notes,
      createdById: log.createdById,
      createdAt: log.createdAt.toISOString(),
    };
  }
}
