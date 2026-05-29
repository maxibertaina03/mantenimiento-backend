import { CreateMachineUseCase } from '../../application/use-cases/create-machine/create-machine.use-case';
import { ListMachinesUseCase } from '../../application/use-cases/list-machines/list-machines.use-case';
import { GetMachineUseCase } from '../../application/use-cases/get-machine/get-machine.use-case';
import { UpdateMachineUseCase } from '../../application/use-cases/update-machine/update-machine.use-case';
import { DeleteMachineUseCase } from '../../application/use-cases/delete-machine/delete-machine.use-case';
import { CreateMachineRequestDto } from '../dtos/create-machine.request.dto';
import { UpdateMachineRequestDto } from '../dtos/update-machine.request.dto';
import { MachineResponseDto } from '../dtos/machine.response.dto';
export declare class MachinesController {
    private readonly createMachine;
    private readonly listMachines;
    private readonly getMachine;
    private readonly updateMachine;
    private readonly deleteMachine;
    constructor(createMachine: CreateMachineUseCase, listMachines: ListMachinesUseCase, getMachine: GetMachineUseCase, updateMachine: UpdateMachineUseCase, deleteMachine: DeleteMachineUseCase);
    create(dto: CreateMachineRequestDto): Promise<MachineResponseDto>;
    list(tenantId: string, page?: number, pageSize?: number, _status?: string, _responsibleId?: string, _search?: string): Promise<{
        items: MachineResponseDto[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    preventiveAlerts(_tenantId: string): Promise<never[]>;
    get(id: string): Promise<MachineResponseDto>;
    update(id: string, dto: UpdateMachineRequestDto): Promise<MachineResponseDto>;
    delete(id: string): Promise<void>;
}
