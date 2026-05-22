import { Inject, Injectable } from '@nestjs/common';
import {
  MACHINE_REPOSITORY,
  type MachineRepository,
  type UsageLogEntry,
} from '../domain/machine.repository';

@Injectable()
export class ListUsageLogsUseCase {
  constructor(@Inject(MACHINE_REPOSITORY) private readonly machines: MachineRepository) {}

  async execute(machineId: string, page = 1, pageSize = 20): Promise<UsageLogEntry[]> {
    return this.machines.listUsageLogs(machineId, (page - 1) * pageSize, pageSize);
  }
}
