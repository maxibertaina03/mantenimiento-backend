"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsModule = void 0;
const common_1 = require("@nestjs/common");
const tools_controller_1 = require("./presentation/tools.controller");
const tool_repository_1 = require("./domain/tool.repository");
const prisma_tool_repository_1 = require("./infrastructure/prisma-tool.repository");
const register_tool_use_case_1 = require("./application/register-tool.use-case");
const update_tool_use_case_1 = require("./application/update-tool.use-case");
const change_tool_status_use_case_1 = require("./application/change-tool-status.use-case");
const loan_tool_use_case_1 = require("./application/loan-tool.use-case");
const return_tool_use_case_1 = require("./application/return-tool.use-case");
const list_tools_use_case_1 = require("./application/list-tools.use-case");
const get_tool_use_case_1 = require("./application/get-tool.use-case");
const list_loans_use_case_1 = require("./application/list-loans.use-case");
const delete_tool_use_case_1 = require("./application/delete-tool.use-case");
let ToolsModule = class ToolsModule {
};
exports.ToolsModule = ToolsModule;
exports.ToolsModule = ToolsModule = __decorate([
    (0, common_1.Module)({
        controllers: [tools_controller_1.ToolsController],
        providers: [
            { provide: tool_repository_1.TOOL_REPOSITORY, useClass: prisma_tool_repository_1.PrismaToolRepository },
            register_tool_use_case_1.RegisterToolUseCase,
            update_tool_use_case_1.UpdateToolUseCase,
            change_tool_status_use_case_1.ChangeToolStatusUseCase,
            loan_tool_use_case_1.LoanToolUseCase,
            return_tool_use_case_1.ReturnToolUseCase,
            list_tools_use_case_1.ListToolsUseCase,
            get_tool_use_case_1.GetToolUseCase,
            list_loans_use_case_1.ListLoansUseCase,
            delete_tool_use_case_1.DeleteToolUseCase,
        ],
    })
], ToolsModule);
//# sourceMappingURL=tools.module.js.map