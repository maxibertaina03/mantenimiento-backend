import { MachineStatus } from '../../domain/value-objects/machine-status.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class MachineListItemDto {
  id!: string;
  code!: string;
  name!: string;
  status!: MachineStatus;
  usageHours!: Decimal;
  location!: string | null;
  createdAt!: Date;
}

export class ListMachinesOutput {
  items!: MachineListItemDto[];
  total!: number;
  page!: number;
  pageSize!: number;
}
