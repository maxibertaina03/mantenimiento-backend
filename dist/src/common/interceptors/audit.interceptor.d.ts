import { CallHandler, ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuditWriter } from '@/infrastructure/audit/audit.writer';
export declare class AuditInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly auditWriter;
    constructor(reflector: Reflector, auditWriter: AuditWriter);
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
    private guessEntityIdFromResult;
    private safeSnapshot;
}
