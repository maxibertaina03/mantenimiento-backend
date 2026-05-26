import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { ConflictError } from '@/common/exceptions/domain.exception';
import { TOOL_REPOSITORY, type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { RegisterToolInput } from './dto/tool-input';

@Injectable()
export class RegisterToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY) private readonly tools: ToolRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    input: RegisterToolInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<Tool> {
    const existing = await this.tools.findByCode(input.code);
    if (existing) {
      throw new ConflictError('TOOL_CODE_TAKEN', `El código ${input.code} ya está en uso`);
    }
    const tool = await this.tools.create({
      code: input.code,
      name: input.name,
      description: input.description ?? null,
      brand: input.brand ?? null,
      model: input.model ?? null,
      serialNumber: input.serialNumber ?? null,
      location: input.location ?? null,
      observations: input.observations ?? null,
      acquiredAt: input.acquiredAt ? new Date(input.acquiredAt) : null,
      tenantId,
    });
    await this.audit.write({
      actorId,
      action: 'CREATE',
      entityType: 'Tool',
      entityId: tool.id,
      payload: { code: tool.code, name: tool.name },
      tenantId,
    });
    return tool;
  }
}
