import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: unknown, host: ArgumentsHost): void;
    private toPayload;
    private fromPrismaKnown;
}
