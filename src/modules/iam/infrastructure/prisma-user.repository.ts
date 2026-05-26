import { Injectable } from '@nestjs/common';
import type { User as PrismaUser } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { User } from '../domain/user.entity';
import type { UserRepository } from '../domain/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id, deletedAt: null } });
    return row ? this.toDomain(row) : null;
  }

  async findByClerkId(clerkUserId: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { clerkUserId } });
    return row ? this.toDomain(row) : null;
  }

  async save(user: User): Promise<User> {
    const row = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        role: user.role,
        status: user.status,
      },
    });
    return this.toDomain(row);
  }

  async list(params: { skip?: number; take?: number }): Promise<{ items: User[]; total: number }> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: { deletedAt: null },
        skip: params.skip ?? 0,
        take: params.take ?? 20,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where: { deletedAt: null } }),
    ]);
    return { items: rows.map((r) => this.toDomain(r)), total };
  }

  private toDomain(row: PrismaUser): User {
    return User.rehydrate({
      id: row.id,
      clerkUserId: row.clerkUserId,
      username: row.username,
      email: row.email,
      firstName: row.firstName,
      lastName: row.lastName,
      avatarUrl: row.avatarUrl,
      role: row.role,
      status: row.status,
      tenantId: row.tenantId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
