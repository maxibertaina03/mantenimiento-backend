import { Tool as PrismaTool } from '@prisma/client';
import { Tool } from '../../domain/entities/tool.entity';
export declare class PrismaToolMapper {
    static toDomain(raw: PrismaTool): Tool;
    static toPersistence(tool: Tool): Omit<PrismaTool, 'createdAt' | 'updatedAt' | 'deletedAt'>;
}
