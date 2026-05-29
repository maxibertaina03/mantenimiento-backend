import { Tool } from '../../domain/entities/tool.entity';
import { CreateToolOutput } from '../dtos/create-tool.output';
export declare class ToolAppMapper {
    static toOutput(tool: Tool): CreateToolOutput;
}
