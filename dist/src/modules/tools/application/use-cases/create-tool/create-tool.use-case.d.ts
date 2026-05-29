import { IToolRepository } from '../../../domain/repositories/tool.repository';
import { CreateToolInput } from '../../dtos/create-tool.input';
import { CreateToolOutput } from '../../dtos/create-tool.output';
export declare class CreateToolUseCase {
    private readonly repository;
    constructor(repository: IToolRepository);
    execute(input: CreateToolInput): Promise<CreateToolOutput>;
}
