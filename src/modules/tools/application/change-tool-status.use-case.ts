import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { TOOL_REPOSITORY, type ToolRepository } from '../domain/tool.repository';
import type { Tool } from '../domain/tool.entity';
import type { ChangeToolStatusInput } from './dto/tool-input';

@Injectable()
export class ChangeToolStatusUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY) private readonly tools: ToolRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(
    id: string,
    input: ChangeToolStatusInput,
    actorId: string,
    tenantId: string | null,
  ): Promise<Tool> {
    const tool = await this.tools.findById(id);
    if (!tool) throw new NotFoundError('Tool', id);
    const { from, to } = tool.changeAdministrativeStatus(input.status);
    const saved = await this.tools.save(tool);
    await this.audit.write({
      actorId,
      action: 'STATE_CHANGE',
      entityType: 'Tool',
      entityId: saved.id,
      payload: { from, to, reason: input.reason },
      tenantId,
    });
    return saved;
  }
}
