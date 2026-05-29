import { ApiProperty } from '@nestjs/swagger';
import { ProviderServiceType } from '../../domain/value-objects/provider-service-type.vo';

export class ProviderResponseDto {
  @ApiProperty({ description: 'ID único del proveedor', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'Nombre del proveedor', example: 'Proveedores Industriales S.A.' })
  name!: string;

  @ApiProperty({ description: 'ID fiscal/RUT', nullable: true, example: '12.345.678-9' })
  taxId!: string | null;

  @ApiProperty({ description: 'Nombre del contacto', nullable: true, example: 'Juan García' })
  contactName!: string | null;

  @ApiProperty({ description: 'Teléfono', nullable: true, example: '+56 2 2345 6789' })
  phone!: string | null;

  @ApiProperty({ description: 'Correo electrónico', nullable: true, example: 'contacto@proveedor.cl' })
  email!: string | null;

  @ApiProperty({ description: 'Dirección', nullable: true })
  address!: string | null;

  @ApiProperty({ description: 'Tipo de servicio', enum: Object.values(ProviderServiceType) })
  serviceType!: ProviderServiceType;

  @ApiProperty({ description: 'Notas adicionales', nullable: true })
  notes!: string | null;

  @ApiProperty({ description: 'Estado activo del proveedor', type: 'boolean' })
  active!: boolean;

  @ApiProperty({ description: 'Fecha de creación', format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ description: 'Última actualización', format: 'date-time' })
  updatedAt!: Date;
}
