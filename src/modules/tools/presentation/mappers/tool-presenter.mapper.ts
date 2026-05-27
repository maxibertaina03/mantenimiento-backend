import { CreateToolOutput } from '../../application/dtos/create-tool.output';
import { ToolResponseDto } from '../dtos/tool.response.dto';
export class ToolPresenterMapper {
  static toResponse(output: CreateToolOutput): ToolResponseDto {
    return {
      id: output.id,
      code: output.code,
      name: output.name,
      description: output.description,
      brand: output.brand,
      model: output.model,
      serialNumber: output.serialNumber,
      status: output.status,
      location: output.location,
      observations: output.observations,
      acquiredAt: output.acquiredAt,
      createdAt: output.createdAt,
      updatedAt: new Date(),
    };
  }
}
