import { IToolRepository } from '../../../domain/repositories/tool.repository';
import { CreateToolOutput } from '../../dtos/create-tool.output';
export declare class GetToolUseCase {
    private readonly repository;
    constructor(repository: IToolRepository);
    execute(id: string): Promise<CreateToolOutput>;
}
