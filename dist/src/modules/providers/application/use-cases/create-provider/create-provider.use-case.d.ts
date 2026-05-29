import { IProviderRepository } from '../../../domain/repositories/provider.repository';
import { CreateProviderInput } from '../../dtos/create-provider.input';
import { CreateProviderOutput } from '../../dtos/create-provider.output';
export declare class CreateProviderUseCase {
    private readonly repository;
    constructor(repository: IProviderRepository);
    execute(input: CreateProviderInput): Promise<CreateProviderOutput>;
}
