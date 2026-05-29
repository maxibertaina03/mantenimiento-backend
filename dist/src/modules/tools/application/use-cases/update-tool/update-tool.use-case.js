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
exports.UpdateToolUseCase = exports.UpdateToolInput = void 0;
const common_1 = require("@nestjs/common");
const tool_repository_1 = require("../../../domain/repositories/tool.repository");
const tool_not_found_exception_1 = require("../../../domain/exceptions/tool-not-found.exception");
const tool_app_mapper_1 = require("../../mappers/tool-app.mapper");
class UpdateToolInput {
    id;
    name;
    location;
}
exports.UpdateToolInput = UpdateToolInput;
let UpdateToolUseCase = class UpdateToolUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const tool = await this.repository.findById(input.id);
        if (!tool)
            throw new tool_not_found_exception_1.ToolNotFoundException(input.id);
        if (input.name)
            tool.changeName(input.name);
        if (input.location !== undefined)
            tool.updateLocation(input.location);
        await this.repository.save(tool);
        return tool_app_mapper_1.ToolAppMapper.toOutput(tool);
    }
};
exports.UpdateToolUseCase = UpdateToolUseCase;
exports.UpdateToolUseCase = UpdateToolUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tool_repository_1.TOOL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateToolUseCase);
//# sourceMappingURL=update-tool.use-case.js.map