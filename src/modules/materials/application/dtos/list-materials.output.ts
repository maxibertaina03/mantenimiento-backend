import { MaterialUnit } from '../../domain/value-objects/material-unit.vo';
import { Decimal } from '@prisma/client/runtime/library';

export class MaterialListItemDto {
  id!: string;
  code!: string;
  name!: string;
  unit!: MaterialUnit;
  stock!: Decimal;
  minStock!: Decimal;
  location?: string | null;
  createdAt!: Date;
}

export class ListMaterialsOutput {
  items!: MaterialListItemDto[];
  total!: number;
  page!: number;
  pageSize!: number;
}
