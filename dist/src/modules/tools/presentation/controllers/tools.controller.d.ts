import { CreateToolUseCase } from '../../application/use-cases/create-tool/create-tool.use-case';
import { ListToolsUseCase } from '../../application/use-cases/list-tools/list-tools.use-case';
import { GetToolUseCase } from '../../application/use-cases/get-tool/get-tool.use-case';
import { UpdateToolUseCase } from '../../application/use-cases/update-tool/update-tool.use-case';
import { DeleteToolUseCase } from '../../application/use-cases/delete-tool/delete-tool.use-case';
import { CreateToolRequestDto } from '../dtos/create-tool.request.dto';
import { UpdateToolRequestDto } from '../dtos/update-tool.request.dto';
import { ToolResponseDto } from '../dtos/tool.response.dto';
export declare class ToolsController {
    private readonly createTool;
    private readonly listTools;
    private readonly getTool;
    private readonly updateTool;
    private readonly deleteTool;
    constructor(createTool: CreateToolUseCase, listTools: ListToolsUseCase, getTool: GetToolUseCase, updateTool: UpdateToolUseCase, deleteTool: DeleteToolUseCase);
    create(dto: CreateToolRequestDto): Promise<ToolResponseDto>;
    list(tenantId: string, page?: number, pageSize?: number, _status?: string, _search?: string): Promise<{
        items: ToolResponseDto[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    get(id: string): Promise<ToolResponseDto>;
    update(id: string, dto: UpdateToolRequestDto): Promise<ToolResponseDto>;
    delete(id: string): Promise<void>;
}
