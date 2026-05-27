"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProviderValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let CreateProviderValidationPipe = class CreateProviderValidationPipe {
    transform(value) {
        if (!value.name || value.name.trim().length === 0) {
            throw new common_1.BadRequestException('Provider name is required');
        }
        if (value.name.length > 255) {
            throw new common_1.BadRequestException('Provider name cannot exceed 255 characters');
        }
        if (value.email && !this.isValidEmail(value.email)) {
            throw new common_1.BadRequestException('Invalid email address');
        }
        return {
            ...value,
            name: value.name.trim(),
        };
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};
exports.CreateProviderValidationPipe = CreateProviderValidationPipe;
exports.CreateProviderValidationPipe = CreateProviderValidationPipe = __decorate([
    (0, common_1.Injectable)()
], CreateProviderValidationPipe);
//# sourceMappingURL=create-provider-validation.pipe.js.map