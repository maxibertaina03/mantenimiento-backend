import { IToolRepository } from '../../../domain/repositories/tool.repository';
export declare class DeleteToolUseCase {
    private readonly repository;
    constructor(repository: IToolRepository);
    execute(id: string): Promise<void>;
}
