import type { AuditAction } from '@prisma/client';
export declare const AUDITED_KEY = "audited";
export interface AuditedMetadata {
    action: AuditAction;
    entity: string;
    resolveEntityId?: (ctx: {
        args: unknown[];
        result: unknown;
    }) => string | undefined;
}
export declare const Audited: (meta: AuditedMetadata) => MethodDecorator;
