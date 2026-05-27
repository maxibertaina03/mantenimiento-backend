import { Machine } from '../entities/machine.entity';

export interface IMachineRepository {
  save(machine: Machine): Promise<void>;
  findById(id: string): Promise<Machine | null>;
  findByCode(code: string): Promise<Machine | null>;
  findAll(tenantId?: string | null): Promise<Machine[]>;
  delete(id: string): Promise<void>;
}

export const MACHINE_REPOSITORY = 'IMachineRepository';
