import type { User } from './user.entity';

/**
 * Puerto del repositorio. La implementación concreta vive en `infrastructure/`.
 * Cada Use Case depende SOLO de esta interfaz.
 */
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByClerkId(clerkUserId: string): Promise<User | null>;
  save(user: User): Promise<User>;
  list(params: { skip?: number; take?: number }): Promise<{ items: User[]; total: number }>;
}

export const USER_REPOSITORY = Symbol('UserRepository');
