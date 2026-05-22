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

import { RegisterMaterialUseCase } from '../application/register-material.use-case';
import { UpdateMaterialUseCase } from '../application/update-material.use-case';
import { RegisterMovementUseCase } from '../application/register-movement.use-case';
import { ListMaterialsUseCase } from '../application/list-materials.use-case';
import { GetMaterialUseCase } from '../application/get-material.use-case';
import { ListMovementsUseCase } from '../application/list-movements.use-case';
import { DeleteMaterialUseCase } from '../application/delete-material.use-case';

import {
  CreateMaterialDto,
  ListMaterialsQueryDto,
  RegisterMovementDto,
  UpdateMaterialDto,
} from './material-request.dto';
import {
  MaterialResponseDto,
  PaginatedMaterialResponseDto,
  StockMovementResponseDto,
} from './material-response.dto';

@ApiTags('materials')
@ApiBearerAuth('clerk')
@Controller({ path: 'materials', version: '1' })
export class MaterialsController {
  constructor(
    private readonly registerUC: RegisterMaterialUseCase,
    private readonly updateUC: UpdateMaterialUseCase,
    private readonly movementUC: RegisterMovementUseCase,
    private readonly listUC: ListMaterialsUseCase,
    private readonly getUC: GetMaterialUseCase,
    private readonly listMovUC: ListMovementsUseCase,
    private readonly deleteUC: DeleteMaterialUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedMaterialResponseDto })
  async list(@Query() q: ListMaterialsQueryDto): Promise<PaginatedMaterialResponseDto> {
    const r = await this.listUC.execute(q);
    return {
      items: r.items.map(MaterialResponseDto.from),
      total: r.total,
      page: r.page,
      pageSize: r.pageSize,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: MaterialResponseDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<MaterialResponseDto> {
    return MaterialResponseDto.from(await this.getUC.execute(id));
  }

  @Get(':id/movements')
  @ApiOkResponse({ type: [StockMovementResponseDto] })
  async movements(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<StockMovementResponseDto[]> {
    const list = await this.listMovUC.execute(
      id,
      page ? Number(page) : 1,
      pageSize ? Number(pageSize) : 20,
    );
    return list.map(StockMovementResponseDto.from);
  }

  @Post()
  @Roles('ADMIN', 'SUPERVISOR')
  async create(
    @Body() dto: CreateMaterialDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MaterialResponseDto> {
    return MaterialResponseDto.from(await this.registerUC.execute(dto, user.id, user.tenantId));
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPERVISOR')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMaterialDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<MaterialResponseDto> {
    return MaterialResponseDto.from(
      await this.updateUC.execute(id, dto, user.id, user.tenantId),
    );
  }

  @Post(':id/movements')
  @Roles('ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'OPERATOR')
  async registerMovement(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RegisterMovementDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ material: MaterialResponseDto; movement: StockMovementResponseDto }> {
    const result = await this.movementUC.execute(id, dto, user.id, user.tenantId);
    return {
      material: MaterialResponseDto.from(result.material),
      movement: StockMovementResponseDto.from(result.movement),
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
