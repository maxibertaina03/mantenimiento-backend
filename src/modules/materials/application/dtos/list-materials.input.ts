export class ListMaterialsInput {
  tenantId?: string | null;
  page?: number;
  pageSize?: number;
  search?: string;
  lowStockOnly?: boolean;
}
