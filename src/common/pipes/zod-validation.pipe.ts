import { Injectable, PipeTransform, type ArgumentMetadata } from '@nestjs/common';
import type { ZodSchema } from 'zod';
import { ValidationError } from '../exceptions/domain.exception';

/**
 * Pipe genérico para validar/transformar payloads con Zod.
 *
 *   @Post()
 *   create(@Body(new ZodValidationPipe(createToolSchema)) dto: CreateToolDto) {}
 *
 * Recomendado por sobre class-validator cuando se quiere compartir schemas entre
 * back y front. Se puede combinar con ambos en un mismo controller.
 */
@Injectable()
export class ZodValidationPipe<T = unknown> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown, _meta: ArgumentMetadata): T {
    const parsed = this.schema.safeParse(value);
    if (!parsed.success) {
      throw new ValidationError(
        'INVALID_PAYLOAD',
        'El cuerpo de la petición no es válido',
        {
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join('.'),
            code: i.code,
            message: i.message,
          })),
        },
      );
    }
    return parsed.data;
  }
}
