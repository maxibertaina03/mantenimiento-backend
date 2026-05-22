import { Injectable, type NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import type { Request, Response, NextFunction } from 'express';
import { appConfig } from '@/config';

export const CLS_TENANT_ID_KEY = 'tenantId';

/**
 * Resuelve el tenant para la request a partir del header `x-tenant-id` (o de la
 * organización Clerk en el futuro) y lo guarda en el CLS context.
 *
 * Sólo activa cuando `MULTI_TENANT_ENABLED=true`. El resto de la app debe leer
 * el tenant vía `clsService.get(CLS_TENANT_ID_KEY)` para queries scoped.
 */
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly cs: ConfigService,
    private readonly cls: ClsService,
  ) {}

  use(req: Request, _res: Response, next: NextFunction): void {
    const cfg = appConfig(this.cs);
    if (!cfg.multiTenant.enabled) return next();

    const headerTenant = req.headers['x-tenant-id'];
    const tenantId =
      typeof headerTenant === 'string' && headerTenant.length > 0 ? headerTenant : null;
    this.cls.set(CLS_TENANT_ID_KEY, tenantId);
    next();
  }
}
