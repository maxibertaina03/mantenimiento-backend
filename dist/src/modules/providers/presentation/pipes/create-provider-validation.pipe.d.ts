import { PipeTransform } from '@nestjs/common';
import { CreateProviderRequestDto } from '../dtos/create-provider.request.dto';
export declare class CreateProviderValidationPipe implements PipeTransform {
    transform(value: CreateProviderRequestDto): CreateProviderRequestDto;
    private isValidEmail;
}
