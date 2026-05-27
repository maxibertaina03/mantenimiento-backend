"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClerkModule = void 0;
const common_1 = require("@nestjs/common");
const clerk_service_1 = require("./clerk.service");
const user_sync_service_1 = require("./user-sync.service");
let ClerkModule = class ClerkModule {
};
exports.ClerkModule = ClerkModule;
exports.ClerkModule = ClerkModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [clerk_service_1.ClerkService, user_sync_service_1.UserSyncService],
        exports: [clerk_service_1.ClerkService, user_sync_service_1.UserSyncService],
    })
], ClerkModule);
//# sourceMappingURL=clerk.module.js.map