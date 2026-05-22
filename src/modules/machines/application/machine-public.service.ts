import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@/common/exceptions/domain.exception';
import { MACHINE_REPOSITORY, type MachineRepository } from '../domain/machine.repository';
import type { Machine } from '../domain/machine.entity';

/**
 * API pública del bounded context Machines hacia OTROS módulos (Maintenance).
 *
 * Esta capa existe para que Maintenance NO importe ni el repo ni los use cases
 * internos de Machines: sólo este servicio, que es estable y mínimo.
 *
 * Mantener la superficie pequeña: si crece, conviene extraer eventos de dominio.
 */
@Injectable()
export class MachinePublicService {
  constructor(@Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository) {}

  async requireById(id: string): Promise<Machine> {
    const m = await this.machines.findById(id);
    if (!m) throw new NotFoundError('Machine', id);
    return m;
  }

  async markPreventiveCompleted(machineId: string, atHours: string): Promise<void> {
    const m = await this.requireById(machineId);
    m.markPreventiveCompleted(atHours);
    await this.machines.save(m);
  }

  async setStatusFromMaintenance(machineId: string, status: Parameters<Machine['changeStatus']>[0]): Promise<void> {
    const m = await this.requireById(machineId);
    if (m.status !== status) {
      m.changeStatus(status);
      await this.machines.save(m);
    }
  }
}
