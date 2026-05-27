import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Provider } from '../../domain/entities/provider.entity';
import { IProviderRepository } from '../../domain/repositories/provider.repository';
export declare class PrismaProviderRepository implements IProviderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(provider: Provider): Promise<void>;
    findById(id: string): Promise<Provider | null>;
    findByName(name: string): Promise<Provider | null>;
    findAll(tenantId?: string | null): Promise<Provider[]>;
    delete(id: string): Promise<void>;
}
