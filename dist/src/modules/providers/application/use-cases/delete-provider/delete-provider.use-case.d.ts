import { IProviderRepository } from '../../../domain/repositories/provider.repository';
export declare class DeleteProviderUseCase {
    private readonly repository;
    constructor(repository: IProviderRepository);
    execute(id: string): Promise<void>;
}
