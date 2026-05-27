import { ApiProperty } from '@nestjs/swagger';
import type { UserRole, UserStatus } from '@prisma/client';
import type { User } from '../domain/user.entity';

export class UserResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ nullable: true })
  username!: string | null;

  @ApiProperty({ format: 'email', nullable: true })
  email!: string | null;

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

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static from(u: User): UserResponseDto {
    return {
      id: u.id,
      username: u.username,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      avatarUrl: u.avatarUrl,
      role: u.role,
      status: u.status,
      tenantId: u.tenantId,
      fullName: u.fullName,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    };
  }
}
