import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { AuditAction } from '@prisma/client';
import type { AuditLogRecord } from '../application/list-audit-logs.use-case';

export class ListAuditLogsQueryDto {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 200, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  pageSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  actorId?: string;

  @ApiPropertyOptional({ enum: AuditAction })
  @IsOptional()
  @IsEnum(AuditAction)
  action?: AuditAction;

  @ApiPropertyOptional({ format: 'date-time' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ format: 'date-time' })
  @IsOptional()
  @IsDateString()
  to?: string;
}

export class AuditLogResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty({ nullable: true, format: 'uuid' }) actorId!: string | null;
  @ApiProperty({ enum: AuditAction }) action!: AuditAction;
  @ApiProperty() entityType!: string;
  @ApiProperty({ nullable: true }) entityId!: string | null;
  @ApiProperty({ nullable: true }) payload!: unknown;
  @ApiProperty({ nullable: true }) ipAddress!: string | null;
  @ApiProperty({ nullable: true }) userAgent!: string | null;
  @ApiProperty({ nullable: true }) requestId!: string | null;
  @ApiProperty({ nullable: true, format: 'uuid' }) tenantId!: string | null;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;

  static from(r: AuditLogRecord): AuditLogResponseDto {
    return {
      id: r.id,
      actorId: r.actorId,
      action: r.action,
      entityType: r.entityType,
      entityId: r.entityId,
      payload: r.payload,
      ipAddress: r.ipAddress,
      userAgent: r.userAgent,
      requestId: r.requestId,
      tenantId: r.tenantId,
      createdAt: r.createdAt.toISOString(),
    };
  }
}

export class PaginatedAuditLogsResponseDto {
  @ApiProperty({ type: [AuditLogResponseDto] }) items!: AuditLogResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
}
