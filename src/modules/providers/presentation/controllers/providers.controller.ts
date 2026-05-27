import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProviderUseCase } from '../../application/use-cases/create-provider/create-provider.use-case';
import { CreateProviderRequestDto } from '../dtos/create-provider.request.dto';
import { ProviderResponseDto } from '../dtos/provider.response.dto';
import { CreateProviderValidationPipe } from '../pipes/create-provider-validation.pipe';
import { ProviderPresenterMapper } from '../mappers/provider-presenter.mapper';
import { ClerkAuthGuard } from '../../../../common/guards/clerk-auth.guard';

@Controller('providers')
@UseGuards(ClerkAuthGuard)
export class ProvidersController {
  constructor(private readonly createProvider: CreateProviderUseCase) {}

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
}
