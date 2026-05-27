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
exports.UserSyncService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const clerk_service_1 = require("./clerk.service");
const domain_exception_1 = require("../../common/exceptions/domain.exception");
let UserSyncService = class UserSyncService {
    prisma;
    clerk;
    constructor(prisma, clerk) {
        this.prisma = prisma;
        this.clerk = clerk;
    }
    async ensureUser(clerkUserId) {
        const byClerkId = await this.prisma.user.findUnique({ where: { clerkUserId } });
        if (byClerkId) {
            this.assertActive(byClerkId);
            return this.toAuthenticated(byClerkId);
        }
        const snap = await this.clerk.getUser(clerkUserId);
        if (!snap.username && !snap.email) {
            throw new domain_exception_1.UnauthorizedError('NO_IDENTIFIER', 'El usuario de Clerk no tiene username ni email');
        }
        const existing = await this.findExistingMatch(snap.username, snap.email);
        if (existing) {
            this.assertActive(existing);
            const updated = await this.prisma.user.update({
                where: { id: existing.id },
                data: {
                    clerkUserId,
                    username: snap.username ?? existing.username,
                    email: snap.email ?? existing.email,
                    firstName: snap.firstName ?? existing.username,
                    lastName: undefined,
                    avatarUrl: snap.imageUrl,
                },
            });
            return this.toAuthenticated(updated);
        }
        const created = await this.prisma.user.create({
            data: {
                clerkUserId,
                username: snap.username,
                email: snap.email,
                firstName: snap.firstName,
                lastName: snap.lastName,
                avatarUrl: snap.imageUrl,
                role: client_1.UserRole.OPERATOR,
                status: client_1.UserStatus.ACTIVE,
            },
        });
        return this.toAuthenticated(created);
    }
    async findExistingMatch(username, email) {
        const ors = [];
        if (username)
            ors.push({ username });
        if (email)
            ors.push({ email });
        if (ors.length === 0)
            return null;
        return this.prisma.user.findFirst({ where: { OR: ors } });
    }
    assertActive(u) {
        if (u.status !== client_1.UserStatus.ACTIVE) {
            throw new domain_exception_1.ForbiddenError('USER_NOT_ACTIVE', `Usuario en estado ${u.status}`);
        }
    }
    toAuthenticated(u) {
        return {
            id: u.id,
            clerkUserId: u.clerkUserId,
            username: u.username,
            email: u.email,
            role: u.role,
            tenantId: u.tenantId,
        };
    }
};
exports.UserSyncService = UserSyncService;
exports.UserSyncService = UserSyncService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        clerk_service_1.ClerkService])
], UserSyncService);
//# sourceMappingURL=user-sync.service.js.map