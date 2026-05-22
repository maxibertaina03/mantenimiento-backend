import { ApiProperty } from '@nestjs/swagger';
import type { UserRole, UserStatus } from '@prisma/client';
import type { User } from '../domain/user.entity';

export class UserResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'email' })
  email!: string;

  @ApiProperty({ nullable: true })
  firstName!: string | null;

  @ApiProperty({ nullable: true })
  lastName!: string | null;

  @ApiProperty({ nullable: true })
  avatarUrl!: string | null;

  @ApiProperty({ enum: ['ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'OPERATOR'] })
  role!: UserRole;

  @ApiProperty({ enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'] })
  status!: UserStatus;

  @ApiProperty({ format: 'uuid', nullable: true })
  tenantId!: string | null;

  @ApiProperty()
  fullName!: string;

  static from(u: User): UserResponseDto {
    return {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      avatarUrl: u.avatarUrl,
      role: u.role,
      status: u.status,
      tenantId: u.tenantId,
      fullName: u.fullName,
    };
  }
}
