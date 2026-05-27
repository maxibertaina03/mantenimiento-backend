import { PipeTransform, type ArgumentMetadata } from '@nestjs/common';
import type { ZodSchema } from 'zod';
export declare class ZodValidationPipe<T = unknown> implements PipeTransform<unknown, T> {
    private readonly schema;
    constructor(schema: ZodSchema<T>);
    transform(value: unknown, _meta: ArgumentMetadata): T;
}
