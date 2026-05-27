import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe, Get, Param, Query, Patch, Delete } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateMaterialUseCase } from '../../application/use-cases/create-material/create-material.use-case';
import { ListMaterialsUseCase } from '../../application/use-cases/list-materials/list-materials.use-case';
import { GetMaterialUseCase } from '../../application/use-cases/get-material/get-material.use-case';
import { UpdateMaterialUseCase } from '../../application/use-cases/update-material/update-material.use-case';
import { DeleteMaterialUseCase } from '../../application/use-cases/delete-material/delete-material.use-case';
import { CreateMaterialRequestDto } from '../dtos/create-material.request.dto';
import { UpdateMaterialRequestDto } from '../dtos/update-material.request.dto';
import { MaterialResponseDto } from '../dtos/material.response.dto';
import { MaterialPresenterMapper } from '../mappers/material-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';
import { GetTenantId } from '../../../../common/decorators/get-tenant-id.decorator';

@Controller('materials')
@UseGuards(ClerkAuthGuard)
export class MaterialsController {
  constructor(
    private readonly createMaterial: CreateMaterialUseCase,
    private readonly listMaterials: ListMaterialsUseCase,
    private readonly getMaterial: GetMaterialUseCase,
    private readonly updateMaterial: UpdateMaterialUseCase,
    private readonly deleteMaterial: DeleteMaterialUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateMaterialRequestDto): Promise<MaterialResponseDto> {
    const output = await this.createMaterial.execute({
      code: dto.code.toUpperCase(),
      name: dto.name,
      description: dto.description ?? null,
      unit: dto.unit,
      stock: dto.stock ? new Decimal(dto.stock) : undefined,
      minStock: dto.minStock ? new Decimal(dto.minStock) : undefined,
      location: dto.location ?? null,
    });
    return MaterialPresenterMapper.toResponse(output);
  }

  @Get()
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const output = await this.listMaterials.execute({
      tenantId,
      page,
      pageSize,
    });
    return {
      items: output.items.map((item) => MaterialPresenterMapper.toResponse(item as any)),
      total: output.total,
      page: output.page,
      pageSize: output.pageSize,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<MaterialResponseDto> {
    const output = await this.getMaterial.execute(id);
    return MaterialPresenterMapper.toResponse(output);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMaterialRequestDto,
  ): Promise<MaterialResponseDto> {
    const output = await this.updateMaterial.execute({
      id,
      name: dto.name,
      location: dto.location,
    });
    return MaterialPresenterMapper.toResponse(output);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteMaterial.execute(id);
  }
}
