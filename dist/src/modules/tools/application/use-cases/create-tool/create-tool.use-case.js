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
exports.CreateToolUseCase = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const tool_entity_1 = require("../../../domain/entities/tool.entity");
const tool_repository_1 = require("../../../domain/repositories/tool.repository");
const tool_status_vo_1 = require("../../../domain/value-objects/tool-status.vo");
const invalid_tool_exception_1 = require("../../../domain/exceptions/invalid-tool.exception");
const tool_app_mapper_1 = require("../../mappers/tool-app.mapper");
let CreateToolUseCase = class CreateToolUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const tool = new tool_entity_1.Tool((0, uuid_1.v4)(), input.code, input.name, input.description ?? null, input.brand ?? null, input.model ?? null, input.serialNumber ?? null, input.status ?? tool_status_vo_1.ToolStatus.AVAILABLE, input.location ?? null, input.observations ?? null, input.acquiredAt ?? null, null);
        const existingTool = await this.repository.findByCode(tool.getCode());
        if (existingTool) {
            throw new invalid_tool_exception_1.InvalidToolException(`Tool with code "${tool.getCode()}" already exists`);
        }
        await this.repository.save(tool);
        return tool_app_mapper_1.ToolAppMapper.toOutput(tool);
    }
};
exports.CreateToolUseCase = CreateToolUseCase;
exports.CreateToolUseCase = CreateToolUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tool_repository_1.TOOL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateToolUseCase);
//# sourceMappingURL=create-tool.use-case.js.map