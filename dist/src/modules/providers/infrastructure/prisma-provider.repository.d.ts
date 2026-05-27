import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { Provider } from '../domain/provider.entity';
import type { CreateProviderProps, ListProvidersQuery, ProviderRepository } from '../domain/provider.repository';
export declare class PrismaProviderRepository implements ProviderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(props: CreateProviderProps): Promise<Provider>;
    findById(id: string): Promise<Provider | null>;
    findByTaxId(taxId: string): Promise<Provider | null>;
    list(query: ListProvidersQuery): Promise<{
        items: Provider[];
        total: number;
    }>;
    save(provider: Provider): Promise<Provider>;
    softDelete(id: string): Promise<void>;
    private toDomain;
}
