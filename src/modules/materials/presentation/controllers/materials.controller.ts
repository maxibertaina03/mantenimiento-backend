import { Controller, Post, Body, UseGuards, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateMaterialUseCase } from '../../application/use-cases/create-material/create-material.use-case';
import { CreateMaterialRequestDto } from '../dtos/create-material.request.dto';
import { MaterialResponseDto } from '../dtos/material.response.dto';
import { MaterialPresenterMapper } from '../mappers/material-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';

@Controller('materials')
@UseGuards(ClerkAuthGuard)
export class MaterialsController {
  constructor(private readonly createMaterial: CreateMaterialUseCase) {}

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
}
