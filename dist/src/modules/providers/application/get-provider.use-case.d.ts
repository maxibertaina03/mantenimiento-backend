import { type ProviderRepository } from '../domain/provider.repository';
import type { Provider } from '../domain/provider.entity';
export declare class GetProviderUseCase {
    private readonly providers;
    constructor(providers: ProviderRepository);
    execute(id: string): Promise<Provider>;
}
