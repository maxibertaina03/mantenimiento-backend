import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ClsModule, ClsService } from 'nestjs-cls';
import { randomUUID } from 'node:crypto';
import { appConfig } from '@/config';

const CLS_REQUEST_ID_KEY = 'requestId';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: () => randomUUID(),
        setup: (cls, req) => {
          const incoming = req.headers['x-request-id'];
          const requestId =
            typeof incoming === 'string' && incoming.length > 0 ? incoming : cls.getId();
          cls.set(CLS_REQUEST_ID_KEY, requestId);
        },
      },
    }),
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService, ClsService],
      useFactory: (cs: ConfigService, cls: ClsService) => {
        const cfg = appConfig(cs);
        const isProd = cfg.env === 'production';
        return {
          pinoHttp: {
            level: cfg.logLevel,
            autoLogging: true,
            redact: {
              paths: [
                'req.headers.authorization',
                'req.headers.cookie',
                '*.password',
                '*.secret',
              ],
              censor: '[REDACTED]',
            },
            transport: isProd
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    colorize: true,
                    translateTime: 'SYS:HH:MM:ss.l',
                    ignore: 'pid,hostname,req,res',
                  },
                },
            customProps: () => ({
              requestId: cls.get<string>(CLS_REQUEST_ID_KEY),
            }),
            serializers: {
              req: (req: { id?: string; method?: string; url?: string }) => ({
                id: req.id,
                method: req.method,
                url: req.url,
              }),
              res: (res: { statusCode?: number }) => ({ statusCode: res.statusCode }),
            },
          },
        };
      },
    }),
  ],
  exports: [PinoLoggerModule, ClsModule],
})
export class LoggerModule {}

export { CLS_REQUEST_ID_KEY };
