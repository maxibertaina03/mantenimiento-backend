import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CreateMachineRequestDto } from '../dtos/create-machine.request.dto';

@Injectable()
export class CreateMachineValidationPipe implements PipeTransform {
  transform(value: CreateMachineRequestDto): CreateMachineRequestDto {
    if (!value.code || value.code.trim().length === 0) {
      throw new BadRequestException('Machine code is required');
    }

    if (!value.name || value.name.trim().length === 0) {
      throw new BadRequestException('Machine name is required');
    }

    if (value.code.length > 50) {
      throw new BadRequestException('Machine code cannot exceed 50 characters');
    }

    if (value.name.length > 255) {
      throw new BadRequestException('Machine name cannot exceed 255 characters');
    }

    return {
      ...value,
      code: value.code.trim().toUpperCase(),
      name: value.name.trim(),
    };
  }
}
