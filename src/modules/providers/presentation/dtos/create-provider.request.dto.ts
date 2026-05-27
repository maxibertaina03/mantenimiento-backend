import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ProviderServiceType } from '../../domain/value-objects/provider-service-type.vo';

export class CreateProviderRequestDto {
  @IsString()
  @MinLength(3, { message: 'Provider name must be at least 3 characters long' })
  @MaxLength(255, { message: 'Provider name cannot exceed 255 characters' })
  name!: string;

  @IsString()
  @IsOptional()
  taxId?: string | null;

  @IsString()
  @IsOptional()
  contactName?: string | null;

  @IsString()
  @IsOptional()
  phone?: string | null;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  email?: string | null;

  @IsString()
  @IsOptional()
  address?: string | null;

  @IsEnum(ProviderServiceType)
  @IsOptional()
  serviceType?: ProviderServiceType;

  @IsString()
  @IsOptional()
  notes?: string | null;
}
