import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TransformResponseInterceptor<T> implements NestInterceptor<T, {
    data: T;
} | T> {
    intercept(_: ExecutionContext, next: CallHandler<T>): Observable<{
        data: T;
    } | T>;
}
