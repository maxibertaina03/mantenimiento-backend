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
exports.ListToolsUseCase = void 0;
const common_1 = require("@nestjs/common");
const tool_repository_1 = require("../../../domain/repositories/tool.repository");
let ListToolsUseCase = class ListToolsUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const tools = await this.repository.findAll(input.tenantId);
        const start = ((input.page ?? 1) - 1) * (input.pageSize ?? 10);
        const end = start + (input.pageSize ?? 10);
        const paginatedTools = tools.slice(start, end);
        const items = paginatedTools.map((t) => ({
            id: t.getId(),
            code: t.getCode(),
            name: t.getName(),
            brand: t.getBrand(),
            model: t.getModel(),
            status: t.getStatus(),
            location: t.getLocation(),
            createdAt: t.getCreatedAt(),
        }));
        return {
            items,
            total: tools.length,
            page: input.page ?? 1,
            pageSize: input.pageSize ?? 10,
        };
    }
};
exports.ListToolsUseCase = ListToolsUseCase;
exports.ListToolsUseCase = ListToolsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tool_repository_1.TOOL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListToolsUseCase);
//# sourceMappingURL=list-tools.use-case.js.map