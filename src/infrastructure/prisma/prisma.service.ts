import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { appConfig } from '@/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(cs: ConfigService) {
    const cfg = appConfig(cs);
    super({
      datasources: { db: { url: cfg.database.url } },
      log:
        cfg.env === 'production'
          ? [{ emit: 'event', level: 'error' }, { emit: 'event', level: 'warn' }]
          : [
              { emit: 'event', level: 'query' },
              { emit: 'event', level: 'error' },
              { emit: 'event', level: 'warn' },
              { emit: 'event', level: 'info' },
            ],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('[PrismaService] connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
