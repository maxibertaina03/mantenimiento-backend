import type { MaterialUnit, Prisma } from '@prisma/client';
import type { Material } from './material.entity';
import type { MovementApplied } from './material.entity';

export interface CreateMaterialProps {
  code: string;
  name: string;
  description?: string | null;
  unit: MaterialUnit;
  initialStock?: string;
  minStock?: string;
  location?: string | null;
  tenantId?: string | null;
}

export interface ListMaterialsQuery {
  skip?: number;
  take?: number;
  search?: string;
  /** Si true, devuelve solo materiales con stock < minStock (y minStock > 0). */
  lowStockOnly?: boolean;
}

export interface MovementPersistInput {
  materialId: string;
  applied: MovementApplied;
  reason?: string | null;
  reference?: string | null;
  createdById: string;
  tenantId?: string | null;
}

export interface StockMovementEntry {
  id: string;
  materialId: string;
  type: import('@prisma/client').StockMovementType;
  quantity: Prisma.Decimal;
  stockAfter: Prisma.Decimal;
  reason: string | null;
  reference: string | null;
  createdById: string;
  createdAt: Date;
}

export interface MaterialRepository {
  create(props: CreateMaterialProps): Promise<Material>;
  findById(id: string): Promise<Material | null>;
  findByCode(code: string): Promise<Material | null>;
  list(query: ListMaterialsQuery): Promise<{ items: Material[]; total: number }>;
  save(material: Material): Promise<Material>;
  softDelete(id: string): Promise<void>;

  /**
   * Persiste atomicamente:
   *  1. Update del stock del material (versión optimista por updatedAt para evitar carrera).
   *  2. Insert del StockMovement con snapshot.
   * Si la versión coincide y el stock proyectado >= 0, commit. Sino, lanza ConflictError.
   */
  persistMovement(
    material: Material,
    movement: MovementPersistInput,
  ): Promise<StockMovementEntry>;

  listMovements(
    materialId: string,
    skip?: number,
    take?: number,
  ): Promise<StockMovementEntry[]>;

  countLowStock(tenantId?: string | null): Promise<number>;
}

export const MATERIAL_REPOSITORY = Symbol('MaterialRepository');
