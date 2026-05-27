import { Provider as PrismaProvider } from '@prisma/client';
import { Provider } from '../../domain/entities/provider.entity';
export declare class PrismaProviderMapper {
    static toDomain(raw: PrismaProvider): Provider;
    static toPersistence(provider: Provider): Omit<PrismaProvider, 'createdAt' | 'updatedAt' | 'deletedAt'>;
}
