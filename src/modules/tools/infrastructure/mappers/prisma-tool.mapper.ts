import { Tool as PrismaTool, ToolStatus as PrismaToolStatus } from '@prisma/client';
import { Tool } from '../../domain/entities/tool.entity';
import { ToolStatus } from '../../domain/value-objects/tool-status.vo';

export class PrismaToolMapper {
  static toDomain(raw: PrismaTool): Tool {
    return new Tool(raw.id, raw.code, raw.name, raw.description, raw.brand, raw.model, raw.serialNumber, raw.status as ToolStatus, raw.location, raw.observations, raw.acquiredAt, raw.tenantId, raw.createdAt, raw.updatedAt, raw.deletedAt);
  }

  static toPersistence(tool: Tool): Omit<PrismaTool, 'createdAt' | 'updatedAt' | 'deletedAt'> {
    return {
      id: tool.getId(),
      code: tool.getCode(),
      name: tool.getName(),
      description: tool.getDescription(),
      brand: tool.getBrand(),
      model: tool.getModel(),
      serialNumber: tool.getSerialNumber(),
      status: tool.getStatus() as PrismaToolStatus,
      location: tool.getLocation(),
      observations: tool.getObservations(),
      acquiredAt: tool.getAcquiredAt(),
      tenantId: tool.getTenantId(),
    };
  }
}
