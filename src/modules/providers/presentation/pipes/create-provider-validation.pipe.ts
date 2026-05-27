import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateProviderRequestDto } from '../dtos/create-provider.request.dto';

@Injectable()
export class CreateProviderValidationPipe implements PipeTransform {
  transform(value: CreateProviderRequestDto): CreateProviderRequestDto {
    if (!value.name || value.name.trim().length === 0) {
      throw new BadRequestException('Provider name is required');
    }

    if (value.name.length > 255) {
      throw new BadRequestException('Provider name cannot exceed 255 characters');
    }

    if (value.email && !this.isValidEmail(value.email)) {
      throw new BadRequestException('Invalid email address');
    }

    return {
      ...value,
      name: value.name.trim(),
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
