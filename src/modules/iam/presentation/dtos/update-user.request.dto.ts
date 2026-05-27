import { IsOptional, IsString, IsEnum } from 'class-validator';
import type { UserRole } from '@prisma/client';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  firstName?: string | null;

  @IsOptional()
  @IsString()
  lastName?: string | null;

  @IsOptional()
  @IsEnum(['ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'OPERATOR'])
  role?: UserRole;
}
