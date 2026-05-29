import { IToolRepository } from '../../../domain/repositories/tool.repository';
import { CreateToolOutput } from '../../dtos/create-tool.output';
export declare class UpdateToolInput {
    id: string;
    name?: string;
    location?: string | null;
}
export declare class UpdateToolUseCase {
    private readonly repository;
    constructor(repository: IToolRepository);
    execute(input: UpdateToolInput): Promise<CreateToolOutput>;
}
