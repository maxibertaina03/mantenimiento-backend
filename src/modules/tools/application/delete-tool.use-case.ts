import { Inject, Injectable } from '@nestjs/common';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
import { InvariantError, NotFoundError } from '@/common/exceptions/domain.exception';
import { TOOL_REPOSITORY, type ToolRepository } from '../domain/tool.repository';

@Injectable()
export class DeleteToolUseCase {
  constructor(
    @Inject(TOOL_REPOSITORY) private readonly tools: ToolRepository,
    private readonly audit: AuditWriter,
  ) {}

  async execute(id: string, actorId: string, tenantId: string | null): Promise<void> {
    const tool = await this.tools.findById(id);
    if (!tool) throw new NotFoundError('Tool', id);
    if (tool.status === 'ON_LOAN') {
      throw new InvariantError(
        'TOOL_ON_LOAN',
        'No se puede eliminar una herramienta prestada. Cerrar el préstamo primero.',
      );
    }
    await this.tools.softDelete(id);
    await this.audit.write({
      actorId,
      action: 'DELETE',
      entityType: 'Tool',
      entityId: id,
      payload: { code: tool.code, name: tool.name },
      tenantId,
    });
  }
}
