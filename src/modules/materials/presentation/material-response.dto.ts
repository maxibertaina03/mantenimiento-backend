import { ApiProperty } from '@nestjs/swagger';
import type { MaterialUnit, StockMovementType } from '@prisma/client';
import type { Material } from '../domain/material.entity';
import type { StockMovementEntry } from '../domain/material.repository';

export class MaterialResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() code!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) description!: string | null;
  @ApiProperty() unit!: MaterialUnit;
  @ApiProperty() stock!: string;
  @ApiProperty() minStock!: string;
  @ApiProperty() isLowStock!: boolean;
  @ApiProperty({ nullable: true }) location!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) tenantId!: string | null;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;
  @ApiProperty({ format: 'date-time' }) updatedAt!: string;

  static from(m: Material): MaterialResponseDto {
    return {
      id: m.id,
      code: m.code,
      name: m.name,
      description: m.description,
      unit: m.unit,
      stock: m.stock.toString(),
      minStock: m.minStock.toString(),
      isLowStock: m.isLowStock,
      location: m.location,
      tenantId: m.tenantId,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    };
  }
}

export class PaginatedMaterialResponseDto {
  @ApiProperty({ type: [MaterialResponseDto] }) items!: MaterialResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
}

export class StockMovementResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ format: 'uuid' }) materialId!: string;
  @ApiProperty() type!: StockMovementType;
  @ApiProperty() quantity!: string;
  @ApiProperty() stockAfter!: string;
  @ApiProperty({ nullable: true }) reason!: string | null;
  @ApiProperty({ nullable: true }) reference!: string | null;
  @ApiProperty({ format: 'uuid' }) createdById!: string;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;

  static from(m: StockMovementEntry): StockMovementResponseDto {
    return {
      id: m.id,
      materialId: m.materialId,
      type: m.type,
      quantity: m.quantity.toString(),
      stockAfter: m.stockAfter.toString(),
      reason: m.reason,
      reference: m.reference,
      createdById: m.createdById,
      createdAt: m.createdAt.toISOString(),
    };
  }
}
