import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateProviderRequestDto {
  @IsString()
  @MinLength(3, { message: 'Provider name must be at least 3 characters long' })
  @MaxLength(255, { message: 'Provider name cannot exceed 255 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  email?: string | null;

  @IsString()
  @IsOptional()
  phone?: string | null;

  @IsString()
  @IsOptional()
  address?: string | null;

  @IsString()
  @IsOptional()
  city?: string | null;

  @IsString()
  @IsOptional()
  postalCode?: string | null;

  @IsString()
  @IsOptional()
  country?: string | null;

  @IsString()
  @IsOptional()
  taxId?: string | null;
}
