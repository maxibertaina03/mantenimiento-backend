import { Decimal } from '@prisma/client/runtime/library';
import { MachineStatus } from '../../domain/value-objects/machine-status.vo';

export class CreateMachineInput {
  code!: string;
  name!: string;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  status?: MachineStatus;
  usageHours?: Decimal;
  location?: string | null;
  responsibleId?: string | null;
  notes?: string | null;
  preventiveIntervalHours?: Decimal | null;
}
