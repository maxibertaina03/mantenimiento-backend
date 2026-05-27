import { type NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import type { Request, Response, NextFunction } from 'express';
export declare const CLS_TENANT_ID_KEY = "tenantId";
export declare class TenantMiddleware implements NestMiddleware {
    private readonly cs;
    private readonly cls;
    constructor(cs: ConfigService, cls: ClsService);
    use(req: Request, _res: Response, next: NextFunction): void;
}
