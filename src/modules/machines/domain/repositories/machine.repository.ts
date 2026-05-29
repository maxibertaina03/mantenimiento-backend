import { Machine } from '../entities/machine.entity';
import { MachineStatus } from '../value-objects/machine-status.vo';

export interface MachineFilters {
  tenantId?: string | null;
  search?: string;
  status?: MachineStatus;
  responsibleId?: string;
}

export interface IMachineRepository {
  save(machine: Machine): Promise<void>;
  findById(id: string): Promise<Machine | null>;
  findByCode(code: string): Promise<Machine | null>;
  findAll(filters?: MachineFilters): Promise<Machine[]>;
  delete(id: string): Promise<void>;
}

export const MACHINE_REPOSITORY = 'IMachineRepository';
