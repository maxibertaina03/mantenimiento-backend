import { IProviderRepository } from '../../../domain/repositories/provider.repository';
import { CreateProviderOutput } from '../../dtos/create-provider.output';
export declare class UpdateProviderInput {
    id: string;
    name?: string;
    contactName?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
}
export declare class UpdateProviderUseCase {
    private readonly repository;
    constructor(repository: IProviderRepository);
    execute(input: UpdateProviderInput): Promise<CreateProviderOutput>;
}
