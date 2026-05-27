import { Tool } from '../../domain/entities/tool.entity';
import { CreateToolOutput } from '../dtos/create-tool.output';
export class ToolAppMapper {
  static toOutput(tool: Tool): CreateToolOutput {
    return {
      id: tool.getId(),
      code: tool.getCode(),
      name: tool.getName(),
      description: tool.getDescription(),
      brand: tool.getBrand(),
      model: tool.getModel(),
      serialNumber: tool.getSerialNumber(),
      status: tool.getStatus(),
      location: tool.getLocation(),
      observations: tool.getObservations(),
      acquiredAt: tool.getAcquiredAt(),
      createdAt: tool.getCreatedAt(),
    };
  }
}
