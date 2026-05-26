import { ApiProperty } from '@nestjs/swagger';
import type { ToolLoanStatus, ToolStatus } from '@prisma/client';
import type { Tool } from '../domain/tool.entity';
import type { ToolLoanRecord } from '../domain/tool.repository';

export class ToolResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) description!: string | null;
  @ApiProperty({ nullable: true }) brand!: string | null;
  @ApiProperty({ nullable: true }) model!: string | null;
  @ApiProperty({ nullable: true }) serialNumber!: string | null;
  @ApiProperty({ enum: ['AVAILABLE', 'ON_LOAN', 'IN_REPAIR', 'OUT_OF_SERVICE'] })
  status!: ToolStatus;
  @ApiProperty({ nullable: true }) location!: string | null;
  @ApiProperty({ nullable: true }) observations!: string | null;
  @ApiProperty({ nullable: true, format: 'date-time' }) acquiredAt!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) tenantId!: string | null;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;
  @ApiProperty({ format: 'date-time' }) updatedAt!: string;

  static from(t: Tool): ToolResponseDto {
    return {
      id: t.id,
      code: t.code,
      name: t.name,
      description: t.description,
      brand: t.brand,
      model: t.model,
      serialNumber: t.serialNumber,
      status: t.status,
      location: t.location,
      observations: t.observations,
      acquiredAt: t.acquiredAt?.toISOString() ?? null,
      tenantId: t.tenantId,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    };
  }
}

export class PaginatedToolResponseDto {
  @ApiProperty({ type: [ToolResponseDto] }) items!: ToolResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
}

export class ToolLoanResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ format: 'uuid' }) toolId!: string;
  @ApiProperty({ format: 'uuid' }) responsibleId!: string;
  @ApiProperty({ format: 'date-time' }) loanedAt!: string;
  @ApiProperty({ nullable: true, format: 'date-time' }) expectedAt!: string | null;
  @ApiProperty({ nullable: true, format: 'date-time' }) returnedAt!: string | null;
  @ApiProperty({ enum: ['ACTIVE', 'RETURNED', 'LOST'] }) status!: ToolLoanStatus;
  @ApiProperty({ nullable: true }) notes!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) tenantId!: string | null;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;

  static from(l: ToolLoanRecord): ToolLoanResponseDto {
    return {
      id: l.id,
      toolId: l.toolId,
      responsibleId: l.responsibleId,
      loanedAt: l.loanedAt.toISOString(),
      expectedAt: l.expectedAt?.toISOString() ?? null,
      returnedAt: l.returnedAt?.toISOString() ?? null,
      status: l.status,
      notes: l.notes,
      tenantId: l.tenantId,
      createdAt: l.createdAt.toISOString(),
    };
  }
}

export class ToolDetailResponseDto {
  @ApiProperty({ type: ToolResponseDto }) tool!: ToolResponseDto;
  @ApiProperty({ type: ToolLoanResponseDto, nullable: true }) activeLoan!: ToolLoanResponseDto | null;
}
