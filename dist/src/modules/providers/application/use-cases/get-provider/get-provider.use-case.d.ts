import { IProviderRepository } from '../../../domain/repositories/provider.repository';
import { CreateProviderOutput } from '../../dtos/create-provider.output';
export declare class GetProviderUseCase {
    private readonly repository;
    constructor(repository: IProviderRepository);
    execute(id: string): Promise<CreateProviderOutput>;
}
