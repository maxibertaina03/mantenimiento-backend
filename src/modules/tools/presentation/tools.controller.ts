import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser, type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';

import { RegisterToolUseCase } from '../application/register-tool.use-case';
import { UpdateToolUseCase } from '../application/update-tool.use-case';
import { ChangeToolStatusUseCase } from '../application/change-tool-status.use-case';
import { LoanToolUseCase } from '../application/loan-tool.use-case';
import { ReturnToolUseCase } from '../application/return-tool.use-case';
import { ListToolsUseCase } from '../application/list-tools.use-case';
import { GetToolUseCase } from '../application/get-tool.use-case';
import { ListLoansUseCase } from '../application/list-loans.use-case';
import { DeleteToolUseCase } from '../application/delete-tool.use-case';

import {
  ChangeToolStatusDto,
  CreateToolDto,
  ListToolsQueryDto,
  LoanToolDto,
  UpdateToolDto,
} from './tool-request.dto';
import {
  PaginatedToolResponseDto,
  ToolDetailResponseDto,
  ToolLoanResponseDto,
  ToolResponseDto,
} from './tool-response.dto';

@ApiTags('tools')
@ApiBearerAuth('clerk')
@Controller({ path: 'tools', version: '1' })
export class ToolsController {
  constructor(
    private readonly registerUC: RegisterToolUseCase,
    private readonly updateUC: UpdateToolUseCase,
    private readonly changeStatusUC: ChangeToolStatusUseCase,
    private readonly loanUC: LoanToolUseCase,
    private readonly returnUC: ReturnToolUseCase,
    private readonly listUC: ListToolsUseCase,
    private readonly getUC: GetToolUseCase,
    private readonly listLoansUC: ListLoansUseCase,
    private readonly deleteUC: DeleteToolUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedToolResponseDto })
  async list(@Query() q: ListToolsQueryDto): Promise<PaginatedToolResponseDto> {
    const r = await this.listUC.execute(q);
    return {
      items: r.items.map(ToolResponseDto.from),
      total: r.total,
      page: r.page,
      pageSize: r.pageSize,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: ToolDetailResponseDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<ToolDetailResponseDto> {
    const { tool, activeLoan } = await this.getUC.execute(id);
    return {
      tool: ToolResponseDto.from(tool),
      activeLoan: activeLoan ? ToolLoanResponseDto.from(activeLoan) : null,
    };
  }

  @Get(':id/loans')
  @ApiOkResponse({ type: [ToolLoanResponseDto] })
  async loans(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<ToolLoanResponseDto[]> {
    const list = await this.listLoansUC.execute(
      id,
      page ? Number(page) : 1,
      pageSize ? Number(pageSize) : 20,
    );
    return list.map(ToolLoanResponseDto.from);
  }

  @Post()
  @Roles('ADMIN', 'SUPERVISOR')
  async create(
    @Body() dto: CreateToolDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ToolResponseDto> {
    return ToolResponseDto.from(await this.registerUC.execute(dto, user.id, user.tenantId));
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERVISOR')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateToolDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ToolResponseDto> {
    return ToolResponseDto.from(await this.updateUC.execute(id, dto, user.id, user.tenantId));
  }

  @Patch(':id/status')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ChangeToolStatusDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ToolResponseDto> {
    return ToolResponseDto.from(
      await this.changeStatusUC.execute(id, dto, user.id, user.tenantId),
    );
  }

  @Post(':id/loans')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN')
  async loan(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: LoanToolDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ tool: ToolResponseDto; loan: ToolLoanResponseDto }> {
    const result = await this.loanUC.execute(id, dto, user.id, user.tenantId);
    return {
      tool: ToolResponseDto.from(result.tool),
      loan: ToolLoanResponseDto.from(result.loan),
    };
  }

  @Post(':id/return')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN')
  async return(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ tool: ToolResponseDto; loan: ToolLoanResponseDto }> {
    const result = await this.returnUC.execute(id, user.id, user.tenantId);
    return {
      tool: ToolResponseDto.from(result.tool),
      loan: ToolLoanResponseDto.from(result.loan),
    };
  }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(204)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<void> {
    await this.deleteUC.execute(id, user.id, user.tenantId);
  }
}
