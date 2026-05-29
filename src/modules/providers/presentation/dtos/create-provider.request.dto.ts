import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ProviderServiceType } from '../../domain/value-objects/provider-service-type.vo';

export class CreateProviderRequestDto {
  @ApiProperty({ description: 'Nombre del proveedor', example: 'Proveedores Industriales S.A.', minLength: 3, maxLength: 255 })
  @IsString()
  @MinLength(3, { message: 'Provider name must be at least 3 characters long' })
  @MaxLength(255, { message: 'Provider name cannot exceed 255 characters' })
  name!: string;

  @ApiProperty({ description: 'ID fiscal/RUT', required: false, example: '12.345.678-9' })
  @IsString()
  @IsOptional()
  taxId?: string | null;

  @ApiProperty({ description: 'Nombre del contacto', required: false, example: 'Juan García' })
  @IsString()
  @IsOptional()
  contactName?: string | null;

  @ApiProperty({ description: 'Teléfono', required: false, example: '+56 2 2345 6789' })
  @IsString()
  @IsOptional()
  phone?: string | null;

  @ApiProperty({ description: 'Correo electrónico', required: false, example: 'contacto@proveedor.cl', format: 'email' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  email?: string | null;

  @ApiProperty({ description: 'Dirección', required: false })
  @IsString()
  @IsOptional()
  address?: string | null;

  @ApiProperty({ description: 'Tipo de servicio', enum: Object.values(ProviderServiceType), required: false })
  @IsEnum(ProviderServiceType)
  @IsOptional()
  serviceType?: ProviderServiceType;

  @ApiProperty({ description: 'Notas adicionales', required: false })
  @IsString()
  @IsOptional()
  notes?: string | null;
}
