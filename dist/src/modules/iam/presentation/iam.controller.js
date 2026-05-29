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
const list_users_use_case_1 = require("../application/list-users.use-case");
const get_user_use_case_1 = require("../application/get-user.use-case");
const update_user_use_case_1 = require("../application/update-user.use-case");
const delete_user_use_case_1 = require("../application/delete-user.use-case");
const user_response_dto_1 = require("./user-response.dto");
const update_user_request_dto_1 = require("./dtos/update-user.request.dto");
let IamController = class IamController {
    getCurrentUser;
    listUsers;
    getUser;
    updateUser;
    deleteUser;
    constructor(getCurrentUser, listUsers, getUser, updateUser, deleteUser) {
        this.getCurrentUser = getCurrentUser;
        this.listUsers = listUsers;
        this.getUser = getUser;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;
    }
    async me(user) {
        const domainUser = await this.getCurrentUser.execute(user.id);
        return user_response_dto_1.UserResponseDto.from(domainUser);
    }
    async list(skip, take) {
        const output = await this.listUsers.execute({ skip, take });
        return {
            items: output.items.map((item) => ({
                id: item.id,
                username: item.username,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                fullName: item.fullName,
                role: item.role,
                status: item.status,
                createdAt: item.createdAt,
            })),
            total: output.total,
        };
    }
    async get(id) {
        return await this.getUser.execute(id);
    }
    async update(id, dto) {
        return await this.updateUser.execute({
            id,
            firstName: dto.firstName,
            lastName: dto.lastName,
            role: dto.role,
        });
    }
    async delete(id) {
        await this.deleteUser.execute(id);
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
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: [user_response_dto_1.UserResponseDto] }),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_request_dto_1.UpdateUserRequestDto]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IamController.prototype, "delete", null);
exports.IamController = IamController = __decorate([
    (0, swagger_1.ApiTags)('iam'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)({ path: 'iam/users', version: '1' }),
    __metadata("design:paramtypes", [get_current_user_use_case_1.GetCurrentUserUseCase,
        list_users_use_case_1.ListUsersUseCase,
        get_user_use_case_1.GetUserUseCase,
        update_user_use_case_1.UpdateUserUseCase,
        delete_user_use_case_1.DeleteUserUseCase])
], IamController);
//# sourceMappingURL=iam.controller.js.map