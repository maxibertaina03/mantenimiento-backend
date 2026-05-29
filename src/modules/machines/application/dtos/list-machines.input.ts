import type { MachineStatus } from '../../domain/value-objects/machine-status.vo';

export class ListMachinesInput {
  tenantId?: string | null;
  page?: number;
  pageSize?: number;
  search?: string;
  status?: MachineStatus;
  responsibleId?: string;
}
