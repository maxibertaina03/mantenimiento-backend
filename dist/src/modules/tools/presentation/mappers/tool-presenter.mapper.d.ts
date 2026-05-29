import { CreateToolOutput } from '../../application/dtos/create-tool.output';
import { ToolResponseDto } from '../dtos/tool.response.dto';
export declare class ToolPresenterMapper {
    static toResponse(output: CreateToolOutput): ToolResponseDto;
}
