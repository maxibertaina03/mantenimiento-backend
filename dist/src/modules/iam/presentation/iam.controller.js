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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const get_current_user_use_case_1 = require("../application/get-current-user.use-case");
const user_response_dto_1 = require("./user-response.dto");
let IamController = class IamController {
    getCurrentUser;
    constructor(getCurrentUser) {
        this.getCurrentUser = getCurrentUser;
    }
    async me(user) {
        const domainUser = await this.getCurrentUser.execute(user.id);
        return user_response_dto_1.UserResponseDto.from(domainUser);
    }
};
exports.IamController = IamController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOkResponse)({ type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "me", null);
exports.IamController = IamController = __decorate([
    (0, swagger_1.ApiTags)('iam'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)({ path: 'iam/users', version: '1' }),
    __metadata("design:paramtypes", [get_current_user_use_case_1.GetCurrentUserUseCase])
], IamController);
//# sourceMappingURL=iam.controller.js.map