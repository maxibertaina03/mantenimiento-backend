import { Provider } from '../../domain/entities/provider.entity';
import { CreateProviderOutput } from '../dtos/create-provider.output';
export declare class ProviderAppMapper {
    static toOutput(provider: Provider): CreateProviderOutput;
}
