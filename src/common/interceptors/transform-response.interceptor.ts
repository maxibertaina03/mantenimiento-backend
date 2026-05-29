import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { Observable, map } from 'rxjs';

/**
 * Convierte recursivamente Decimal de Prisma a string.
 * Sin esto, React intenta renderizar el objeto interno `{s, e, d}` y rompe.
 */
function serializeDecimals(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (value instanceof Decimal) return value.toString();
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value.map(serializeDecimals);
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = serializeDecimals(v);
    }
    return out;
  }
  return value;
}

/**
 * Envuelve todas las respuestas exitosas en `{ data: ... }`.
 * Excluye respuestas en streaming (archivos) y respuestas ya envueltas (`data` o `error`).
 */
@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, { data: T } | T> {
  intercept(_: ExecutionContext, next: CallHandler<T>): Observable<{ data: T } | T> {
    return next.handle().pipe(
      map((value) => {
        if (value instanceof StreamableFile) return value;
        const serialized = serializeDecimals(value) as T;
        if (
          serialized &&
          typeof serialized === 'object' &&
          ('data' in serialized || 'error' in serialized)
        ) {
          return serialized;
        }
        return { data: serialized };
      }),
    );
  }
}
