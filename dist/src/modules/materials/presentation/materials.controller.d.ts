import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { RegisterMaterialUseCase } from '../application/register-material.use-case';
import { UpdateMaterialUseCase } from '../application/update-material.use-case';
import { RegisterMovementUseCase } from '../application/register-movement.use-case';
import { ListMaterialsUseCase } from '../application/list-materials.use-case';
import { GetMaterialUseCase } from '../application/get-material.use-case';
import { ListMovementsUseCase } from '../application/list-movements.use-case';
import { DeleteMaterialUseCase } from '../application/delete-material.use-case';
import { CreateMaterialDto, ListMaterialsQueryDto, RegisterMovementDto, UpdateMaterialDto } from './material-request.dto';
import { MaterialResponseDto, PaginatedMaterialResponseDto, StockMovementResponseDto } from './material-response.dto';
export declare class MaterialsController {
    private readonly registerUC;
    private readonly updateUC;
    private readonly movementUC;
    private readonly listUC;
    private readonly getUC;
    private readonly listMovUC;
    private readonly deleteUC;
    constructor(registerUC: RegisterMaterialUseCase, updateUC: UpdateMaterialUseCase, movementUC: RegisterMovementUseCase, listUC: ListMaterialsUseCase, getUC: GetMaterialUseCase, listMovUC: ListMovementsUseCase, deleteUC: DeleteMaterialUseCase);
    list(q: ListMaterialsQueryDto): Promise<PaginatedMaterialResponseDto>;
    get(id: string): Promise<MaterialResponseDto>;
    movements(id: string, page?: number, pageSize?: number): Promise<StockMovementResponseDto[]>;
    create(dto: CreateMaterialDto, user: AuthenticatedUser): Promise<MaterialResponseDto>;
    update(id: string, dto: UpdateMaterialDto, user: AuthenticatedUser): Promise<MaterialResponseDto>;
    registerMovement(id: string, dto: RegisterMovementDto, user: AuthenticatedUser): Promise<{
        material: MaterialResponseDto;
        movement: StockMovementResponseDto;
    }>;
    remove(id: string, user: AuthenticatedUser): Promise<void>;
}
