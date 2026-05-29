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
const tools_controller_1 = require("./presentation/controllers/tools.controller");
const create_tool_use_case_1 = require("./application/use-cases/create-tool/create-tool.use-case");
const list_tools_use_case_1 = require("./application/use-cases/list-tools/list-tools.use-case");
const get_tool_use_case_1 = require("./application/use-cases/get-tool/get-tool.use-case");
const update_tool_use_case_1 = require("./application/use-cases/update-tool/update-tool.use-case");
const delete_tool_use_case_1 = require("./application/use-cases/delete-tool/delete-tool.use-case");
const prisma_tool_repository_1 = require("./infrastructure/repositories/prisma-tool.repository");
const tool_repository_1 = require("./domain/repositories/tool.repository");
const prisma_module_1 = require("../../infrastructure/prisma/prisma.module");
let ToolsModule = class ToolsModule {
};
exports.ToolsModule = ToolsModule;
exports.ToolsModule = ToolsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [tools_controller_1.ToolsController],
        providers: [
            create_tool_use_case_1.CreateToolUseCase,
            list_tools_use_case_1.ListToolsUseCase,
            get_tool_use_case_1.GetToolUseCase,
            update_tool_use_case_1.UpdateToolUseCase,
            delete_tool_use_case_1.DeleteToolUseCase,
            {
                provide: tool_repository_1.TOOL_REPOSITORY,
                useClass: prisma_tool_repository_1.PrismaToolRepository,
            },
        ],
        exports: [create_tool_use_case_1.CreateToolUseCase, list_tools_use_case_1.ListToolsUseCase, get_tool_use_case_1.GetToolUseCase, update_tool_use_case_1.UpdateToolUseCase, delete_tool_use_case_1.DeleteToolUseCase],
    })
], ToolsModule);
//# sourceMappingURL=tools.module.js.map