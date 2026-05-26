import { ApiProperty } from '@nestjs/swagger';
import type { ProviderServiceType } from '@prisma/client';
import type { Provider } from '../domain/provider.entity';

export class ProviderResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ nullable: true }) taxId!: string | null;
  @ApiProperty({ nullable: true }) contactName!: string | null;
  @ApiProperty({ nullable: true }) phone!: string | null;
  @ApiProperty({ nullable: true }) email!: string | null;
  @ApiProperty({ nullable: true }) address!: string | null;
  @ApiProperty({
    enum: ['MAINTENANCE', 'PARTS', 'TOOLS', 'MATERIALS', 'CONSULTING', 'OTHER'],
  })
  serviceType!: ProviderServiceType;
  @ApiProperty({ nullable: true }) notes!: string | null;
  @ApiProperty() active!: boolean;
  @ApiProperty({ nullable: true, format: 'uuid' }) tenantId!: string | null;
  @ApiProperty({ format: 'date-time' }) createdAt!: string;
  @ApiProperty({ format: 'date-time' }) updatedAt!: string;

  static from(p: Provider): ProviderResponseDto {
    return {
      id: p.id,
      name: p.name,
      taxId: p.taxId,
      contactName: p.contactName,
      phone: p.phone,
      email: p.email,
      address: p.address,
      serviceType: p.serviceType,
      notes: p.notes,
      active: p.active,
      tenantId: p.tenantId,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  }
}

export class PaginatedProviderResponseDto {
  @ApiProperty({ type: [ProviderResponseDto] }) items!: ProviderResponseDto[];
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() pageSize!: number;
}
