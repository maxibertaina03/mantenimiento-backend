import { IToolRepository } from '../../../domain/repositories/tool.repository';
import { ListToolsInput } from '../../dtos/list-tools.input';
import type { CreateToolOutput } from '../../dtos/create-tool.output';
export interface ListToolsOutput {
    items: CreateToolOutput[];
    total: number;
    page: number;
    pageSize: number;
}
export declare class ListToolsUseCase {
    private readonly repository;
    constructor(repository: IToolRepository);
    execute(input: ListToolsInput): Promise<ListToolsOutput>;
}
