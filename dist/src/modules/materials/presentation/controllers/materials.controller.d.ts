import { CreateMaterialUseCase } from '../../application/use-cases/create-material/create-material.use-case';
import { ListMaterialsUseCase } from '../../application/use-cases/list-materials/list-materials.use-case';
import { GetMaterialUseCase } from '../../application/use-cases/get-material/get-material.use-case';
import { UpdateMaterialUseCase } from '../../application/use-cases/update-material/update-material.use-case';
import { DeleteMaterialUseCase } from '../../application/use-cases/delete-material/delete-material.use-case';
import { CreateMaterialRequestDto } from '../dtos/create-material.request.dto';
import { UpdateMaterialRequestDto } from '../dtos/update-material.request.dto';
import { MaterialResponseDto } from '../dtos/material.response.dto';
export declare class MaterialsController {
    private readonly createMaterial;
    private readonly listMaterials;
    private readonly getMaterial;
    private readonly updateMaterial;
    private readonly deleteMaterial;
    constructor(createMaterial: CreateMaterialUseCase, listMaterials: ListMaterialsUseCase, getMaterial: GetMaterialUseCase, updateMaterial: UpdateMaterialUseCase, deleteMaterial: DeleteMaterialUseCase);
    create(dto: CreateMaterialRequestDto): Promise<MaterialResponseDto>;
    list(tenantId: string, page?: number, pageSize?: number, _search?: string, _lowStockOnly?: string): Promise<{
        items: MaterialResponseDto[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    get(id: string): Promise<MaterialResponseDto>;
    update(id: string, dto: UpdateMaterialRequestDto): Promise<MaterialResponseDto>;
    delete(id: string): Promise<void>;
}
