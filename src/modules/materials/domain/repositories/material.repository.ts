import { Material } from '../entities/material.entity';

export interface MaterialFilters {
  tenantId?: string | null;
  search?: string;
  lowStockOnly?: boolean;
}

export interface IMaterialRepository {
  save(material: Material): Promise<void>;
  findById(id: string): Promise<Material | null>;
  findByCode(code: string): Promise<Material | null>;
  findAll(filters?: MaterialFilters): Promise<Material[]>;
  delete(id: string): Promise<void>;
}
export const MATERIAL_REPOSITORY = 'IMaterialRepository';
