import { IToolRepository } from '../../../domain/repositories/tool.repository';
import { ListToolsInput } from '../../dtos/list-tools.input';
import { ListToolsOutput } from '../../dtos/list-tools.output';
export declare class ListToolsUseCase {
    private readonly repository;
    constructor(repository: IToolRepository);
    execute(input: ListToolsInput): Promise<ListToolsOutput>;
}
