import { ToolStatus } from '../../domain/value-objects/tool-status.vo';
export class ToolResponseDto {
  id!: string;
  code!: string;
  name!: string;
  description!: string | null;
  brand!: string | null;
  model!: string | null;
  serialNumber!: string | null;
  status!: ToolStatus;
  location!: string | null;
  observations!: string | null;
  acquiredAt!: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}
