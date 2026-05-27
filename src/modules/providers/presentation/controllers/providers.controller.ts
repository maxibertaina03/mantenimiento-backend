import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateProviderUseCase } from '../../application/use-cases/create-provider/create-provider.use-case';
import { ListProvidersUseCase } from '../../application/use-cases/list-providers/list-providers.use-case';
import { GetProviderUseCase } from '../../application/use-cases/get-provider/get-provider.use-case';
import { UpdateProviderUseCase } from '../../application/use-cases/update-provider/update-provider.use-case';
import { DeleteProviderUseCase } from '../../application/use-cases/delete-provider/delete-provider.use-case';
import { CreateProviderRequestDto } from '../dtos/create-provider.request.dto';
import { UpdateProviderRequestDto } from '../dtos/update-provider.request.dto';
import { ProviderResponseDto } from '../dtos/provider.response.dto';
import { CreateProviderValidationPipe } from '../pipes/create-provider-validation.pipe';
import { ProviderPresenterMapper } from '../mappers/provider-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';
import { GetTenantId } from '../../../../common/decorators/get-tenant-id.decorator';

@Controller('providers')
@UseGuards(ClerkAuthGuard)
export class ProvidersController {
  constructor(
    private readonly createProvider: CreateProviderUseCase,
    private readonly listProviders: ListProvidersUseCase,
    private readonly getProvider: GetProviderUseCase,
    private readonly updateProvider: UpdateProviderUseCase,
    private readonly deleteProvider: DeleteProviderUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(CreateProviderValidationPipe, new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: CreateProviderRequestDto): Promise<ProviderResponseDto> {
    const output = await this.createProvider.execute({
      name: dto.name,
      taxId: dto.taxId ?? null,
      contactName: dto.contactName ?? null,
      phone: dto.phone ?? null,
      email: dto.email ?? null,
      address: dto.address ?? null,
      serviceType: dto.serviceType,
      notes: dto.notes ?? null,
    });
    return ProviderPresenterMapper.toResponse(output);
  }

  @Get()
  async list(
    @GetTenantId() tenantId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const output = await this.listProviders.execute({
      tenantId,
      page,
      pageSize,
    });
    return {
      items: output.items.map((item) => ProviderPresenterMapper.toResponse(item as any)),
      total: output.total,
      page: output.page,
      pageSize: output.pageSize,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<ProviderResponseDto> {
    const output = await this.getProvider.execute(id);
    return ProviderPresenterMapper.toResponse(output);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProviderRequestDto,
  ): Promise<ProviderResponseDto> {
    const output = await this.updateProvider.execute({
      id,
      name: dto.name,
      contactName: dto.contactName,
      phone: dto.phone,
      email: dto.email,
      address: dto.address,
    });
    return ProviderPresenterMapper.toResponse(output);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteProvider.execute(id);
  }
}
