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
exports.ClerkService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const backend_1 = require("@clerk/backend");
const config_2 = require("../../config");
const domain_exception_1 = require("../../common/exceptions/domain.exception");
let ClerkService = class ClerkService {
    client;
    secretKey;
    issuer;
    constructor(cs) {
        const cfg = (0, config_2.appConfig)(cs);
        this.secretKey = cfg.clerk.secretKey;
        this.issuer = cfg.clerk.jwtIssuer;
        this.client = (0, backend_1.createClerkClient)({
            secretKey: cfg.clerk.secretKey,
            publishableKey: cfg.clerk.publishableKey,
        });
    }
    async verifyToken(token) {
        try {
            const payload = await (0, backend_1.verifyToken)(token, {
                secretKey: this.secretKey,
                ...(this.issuer ? { issuer: this.issuer } : {}),
            });
            if (!payload.sub)
                throw new Error('Token sin subject');
            return { userId: payload.sub, sessionId: payload.sid ?? '' };
        }
        catch (err) {
            throw new domain_exception_1.UnauthorizedError('INVALID_TOKEN', err instanceof Error ? err.message : 'Token inválido');
        }
    }
    async getUser(clerkUserId) {
        const u = await this.client.users.getUser(clerkUserId);
        const email = u.emailAddresses.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress ??
            u.emailAddresses[0]?.emailAddress ??
            null;
        const username = u.username ?? null;
        if (!username && !email) {
            throw new domain_exception_1.UnauthorizedError('NO_IDENTIFIER', 'El usuario de Clerk no tiene ni username ni email');
        }
        return {
            id: u.id,
            username,
            email,
            firstName: u.firstName,
            lastName: u.lastName,
            imageUrl: u.imageUrl,
        };
    }
};
exports.ClerkService = ClerkService;
exports.ClerkService = ClerkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ClerkService);
//# sourceMappingURL=clerk.service.js.map