import { Inject, Injectable } from '@nestjs/common';
import {
  MATERIAL_REPOSITORY,
  type MaterialRepository,
  type StockMovementEntry,
} from '../domain/material.repository';

@Injectable()
export class ListMovementsUseCase {
  constructor(@Inject(MATERIAL_REPOSITORY) private readonly materials: MaterialRepository) {}

  async execute(materialId: string, page = 1, pageSize = 20): Promise<StockMovementEntry[]> {
    return this.materials.listMovements(materialId, (page - 1) * pageSize, pageSize);
  }
}
