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
exports.ClerkAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../decorators/public.decorator");
const domain_exception_1 = require("../exceptions/domain.exception");
const clerk_service_1 = require("../../infrastructure/clerk/clerk.service");
const user_sync_service_1 = require("../../infrastructure/clerk/user-sync.service");
let ClerkAuthGuard = class ClerkAuthGuard {
    reflector;
    clerk;
    userSync;
    constructor(reflector, clerk, userSync) {
        this.reflector = reflector;
        this.clerk = clerk;
        this.userSync = userSync;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const req = context.switchToHttp().getRequest();
        const token = this.extractBearer(req);
        if (!token)
            throw new domain_exception_1.UnauthorizedError('MISSING_TOKEN', 'Falta token de autenticación');
        const session = await this.clerk.verifyToken(token);
        const user = await this.userSync.ensureUser(session.userId);
        req.user = user;
        return true;
    }
    extractBearer(req) {
        const header = req.headers.authorization;
        if (!header || typeof header !== 'string')
            return null;
        const [scheme, token] = header.split(' ');
        if (scheme?.toLowerCase() !== 'bearer' || !token)
            return null;
        return token;
    }
};
exports.ClerkAuthGuard = ClerkAuthGuard;
exports.ClerkAuthGuard = ClerkAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        clerk_service_1.ClerkService,
        user_sync_service_1.UserSyncService])
], ClerkAuthGuard);
//# sourceMappingURL=clerk-auth.guard.js.map