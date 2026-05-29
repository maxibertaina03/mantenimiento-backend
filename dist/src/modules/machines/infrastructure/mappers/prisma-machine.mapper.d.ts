import { Machine as PrismaMachine } from '@prisma/client';
import { Machine } from '../../domain/entities/machine.entity';
export declare class PrismaMachineMapper {
    static toDomain(raw: PrismaMachine): Machine;
    static toPersistence(machine: Machine): Omit<PrismaMachine, 'createdAt' | 'updatedAt' | 'deletedAt'>;
}
