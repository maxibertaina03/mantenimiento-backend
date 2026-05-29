"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamModule = void 0;
const common_1 = require("@nestjs/common");
const iam_controller_1 = require("./presentation/iam.controller");
const get_current_user_use_case_1 = require("./application/get-current-user.use-case");
const list_users_use_case_1 = require("./application/list-users.use-case");
const get_user_use_case_1 = require("./application/get-user.use-case");
const update_user_use_case_1 = require("./application/update-user.use-case");
const delete_user_use_case_1 = require("./application/delete-user.use-case");
const user_repository_1 = require("./domain/user.repository");
const prisma_user_repository_1 = require("./infrastructure/prisma-user.repository");
let IamModule = class IamModule {
};
exports.IamModule = IamModule;
exports.IamModule = IamModule = __decorate([
    (0, common_1.Module)({
        controllers: [iam_controller_1.IamController],
        providers: [
            get_current_user_use_case_1.GetCurrentUserUseCase,
            list_users_use_case_1.ListUsersUseCase,
            get_user_use_case_1.GetUserUseCase,
            update_user_use_case_1.UpdateUserUseCase,
            delete_user_use_case_1.DeleteUserUseCase,
            { provide: user_repository_1.USER_REPOSITORY, useClass: prisma_user_repository_1.PrismaUserRepository },
        ],
        exports: [get_current_user_use_case_1.GetCurrentUserUseCase, list_users_use_case_1.ListUsersUseCase, get_user_use_case_1.GetUserUseCase, update_user_use_case_1.UpdateUserUseCase, delete_user_use_case_1.DeleteUserUseCase],
    })
], IamModule);
//# sourceMappingURL=iam.module.js.map