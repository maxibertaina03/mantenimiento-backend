import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { RegisterToolUseCase } from '../application/register-tool.use-case';
import { UpdateToolUseCase } from '../application/update-tool.use-case';
import { ChangeToolStatusUseCase } from '../application/change-tool-status.use-case';
import { LoanToolUseCase } from '../application/loan-tool.use-case';
import { ReturnToolUseCase } from '../application/return-tool.use-case';
import { ListToolsUseCase } from '../application/list-tools.use-case';
import { GetToolUseCase } from '../application/get-tool.use-case';
import { ListLoansUseCase } from '../application/list-loans.use-case';
import { DeleteToolUseCase } from '../application/delete-tool.use-case';
import { ChangeToolStatusDto, CreateToolDto, ListToolsQueryDto, LoanToolDto, UpdateToolDto } from './tool-request.dto';
import { PaginatedToolResponseDto, ToolDetailResponseDto, ToolLoanResponseDto, ToolResponseDto } from './tool-response.dto';
export declare class ToolsController {
    private readonly registerUC;
    private readonly updateUC;
    private readonly changeStatusUC;
    private readonly loanUC;
    private readonly returnUC;
    private readonly listUC;
    private readonly getUC;
    private readonly listLoansUC;
    private readonly deleteUC;
    constructor(registerUC: RegisterToolUseCase, updateUC: UpdateToolUseCase, changeStatusUC: ChangeToolStatusUseCase, loanUC: LoanToolUseCase, returnUC: ReturnToolUseCase, listUC: ListToolsUseCase, getUC: GetToolUseCase, listLoansUC: ListLoansUseCase, deleteUC: DeleteToolUseCase);
    list(q: ListToolsQueryDto): Promise<PaginatedToolResponseDto>;
    get(id: string): Promise<ToolDetailResponseDto>;
    loans(id: string, page?: number, pageSize?: number): Promise<ToolLoanResponseDto[]>;
    create(dto: CreateToolDto, user: AuthenticatedUser): Promise<ToolResponseDto>;
    update(id: string, dto: UpdateToolDto, user: AuthenticatedUser): Promise<ToolResponseDto>;
    changeStatus(id: string, dto: ChangeToolStatusDto, user: AuthenticatedUser): Promise<ToolResponseDto>;
    loan(id: string, dto: LoanToolDto, user: AuthenticatedUser): Promise<{
        tool: ToolResponseDto;
        loan: ToolLoanResponseDto;
    }>;
    return(id: string, user: AuthenticatedUser): Promise<{
        tool: ToolResponseDto;
        loan: ToolLoanResponseDto;
    }>;
    remove(id: string, user: AuthenticatedUser): Promise<void>;
}
