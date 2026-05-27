"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLS_REQUEST_ID_KEY = exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const nestjs_cls_1 = require("nestjs-cls");
const node_crypto_1 = require("node:crypto");
const config_2 = require("../../config");
const CLS_REQUEST_ID_KEY = 'requestId';
exports.CLS_REQUEST_ID_KEY = CLS_REQUEST_ID_KEY;
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: {
                    mount: true,
                    generateId: true,
                    idGenerator: () => (0, node_crypto_1.randomUUID)(),
                    setup: (cls, req) => {
                        const incoming = req.headers['x-request-id'];
                        const requestId = typeof incoming === 'string' && incoming.length > 0 ? incoming : cls.getId();
                        cls.set(CLS_REQUEST_ID_KEY, requestId);
                    },
                },
            }),
            nestjs_pino_1.LoggerModule.forRootAsync({
                inject: [config_1.ConfigService, nestjs_cls_1.ClsService],
                useFactory: (cs, cls) => {
                    const cfg = (0, config_2.appConfig)(cs);
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
                                requestId: cls.get(CLS_REQUEST_ID_KEY),
                            }),
                            serializers: {
                                req: (req) => ({
                                    id: req.id,
                                    method: req.method,
                                    url: req.url,
                                }),
                                res: (res) => ({ statusCode: res.statusCode }),
                            },
                        },
                    };
                },
            }),
        ],
        exports: [nestjs_pino_1.LoggerModule, nestjs_cls_1.ClsModule],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map