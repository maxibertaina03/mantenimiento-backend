import { Material } from '../entities/material.entity';
export interface IMaterialRepository {
    save(material: Material): Promise<void>;
    findById(id: string): Promise<Material | null>;
    findByCode(code: string): Promise<Material | null>;
    findAll(tenantId?: string | null): Promise<Material[]>;
    delete(id: string): Promise<void>;
}
export declare const MATERIAL_REPOSITORY = "IMaterialRepository";
