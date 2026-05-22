import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

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
        if (value && typeof value === 'object' && ('data' in value || 'error' in value)) {
          return value;
        }
        return { data: value };
      }),
    );
  }
}
