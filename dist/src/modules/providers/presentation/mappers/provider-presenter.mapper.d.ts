import { CreateProviderOutput } from '../../application/dtos/create-provider.output';
import { ProviderResponseDto } from '../dtos/provider.response.dto';
export declare class ProviderPresenterMapper {
    static toResponse(output: CreateProviderOutput): ProviderResponseDto;
}
