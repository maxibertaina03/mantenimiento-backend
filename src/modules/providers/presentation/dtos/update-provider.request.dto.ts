import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProviderRequestDto {
  @ApiProperty({ description: 'Nombre del proveedor', required: false, example: 'Proveedores Industriales S.A.' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Nombre del contacto', required: false, example: 'Juan García' })
  @IsOptional()
  @IsString()
  contactName?: string | null;

  @ApiProperty({ description: 'Teléfono', required: false, example: '+56 2 2345 6789' })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiProperty({ description: 'Correo electrónico', required: false, example: 'contacto@proveedor.cl', format: 'email' })
  @IsOptional()
  @IsString()
  email?: string | null;

  @ApiProperty({ description: 'Dirección', required: false })
  @IsOptional()
  @IsString()
  address?: string | null;
}
