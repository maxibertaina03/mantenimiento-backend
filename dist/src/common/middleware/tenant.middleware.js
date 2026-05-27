"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantMiddleware = exports.CLS_TENANT_ID_KEY = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_cls_1 = require("nestjs-cls");
const config_2 = require("../../config");
exports.CLS_TENANT_ID_KEY = 'tenantId';
let TenantMiddleware = class TenantMiddleware {
    cs;
    cls;
    constructor(cs, cls) {
        this.cs = cs;
        this.cls = cls;
    }
    use(req, _res, next) {
        const cfg = (0, config_2.appConfig)(this.cs);
        if (!cfg.multiTenant.enabled)
            return next();
        const headerTenant = req.headers['x-tenant-id'];
        const tenantId = typeof headerTenant === 'string' && headerTenant.length > 0 ? headerTenant : null;
        this.cls.set(exports.CLS_TENANT_ID_KEY, tenantId);
        next();
    }
};
exports.TenantMiddleware = TenantMiddleware;
exports.TenantMiddleware = TenantMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        nestjs_cls_1.ClsService])
], TenantMiddleware);
//# sourceMappingURL=tenant.middleware.js.map