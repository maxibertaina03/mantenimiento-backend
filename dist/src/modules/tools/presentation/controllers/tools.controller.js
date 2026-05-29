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
exports.ToolsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_tool_use_case_1 = require("../../application/use-cases/create-tool/create-tool.use-case");
const list_tools_use_case_1 = require("../../application/use-cases/list-tools/list-tools.use-case");
const get_tool_use_case_1 = require("../../application/use-cases/get-tool/get-tool.use-case");
const update_tool_use_case_1 = require("../../application/use-cases/update-tool/update-tool.use-case");
const delete_tool_use_case_1 = require("../../application/use-cases/delete-tool/delete-tool.use-case");
const create_tool_request_dto_1 = require("../dtos/create-tool.request.dto");
const update_tool_request_dto_1 = require("../dtos/update-tool.request.dto");
const tool_response_dto_1 = require("../dtos/tool.response.dto");
const tool_presenter_mapper_1 = require("../mappers/tool-presenter.mapper");
const clerk_auth_guard_1 = require("../../../../common/guards/clerk-auth.guard");
const get_tenant_id_decorator_1 = require("../../../../common/decorators/get-tenant-id.decorator");
let ToolsController = class ToolsController {
    createTool;
    listTools;
    getTool;
    updateTool;
    deleteTool;
    constructor(createTool, listTools, getTool, updateTool, deleteTool) {
        this.createTool = createTool;
        this.listTools = listTools;
        this.getTool = getTool;
        this.updateTool = updateTool;
        this.deleteTool = deleteTool;
    }
    async create(dto) {
        const output = await this.createTool.execute({
            code: dto.code.toUpperCase(),
            name: dto.name,
            description: dto.description ?? null,
            brand: dto.brand ?? null,
            model: dto.model ?? null,
            serialNumber: dto.serialNumber ?? null,
            status: dto.status,
            location: dto.location ?? null,
            observations: dto.observations ?? null,
            acquiredAt: dto.acquiredAt ?? null,
        });
        return tool_presenter_mapper_1.ToolPresenterMapper.toResponse(output);
    }
    async list(tenantId, page, pageSize, _status, _search) {
        const output = await this.listTools.execute({
            tenantId,
            page,
            pageSize,
        });
        return {
            items: output.items.map((item) => tool_presenter_mapper_1.ToolPresenterMapper.toResponse(item)),
            total: output.total,
            page: output.page,
            pageSize: output.pageSize,
        };
    }
    async get(id) {
        const output = await this.getTool.execute(id);
        return tool_presenter_mapper_1.ToolPresenterMapper.toResponse(output);
    }
    async update(id, dto) {
        const output = await this.updateTool.execute({
            id,
            name: dto.name,
            location: dto.location,
        });
        return tool_presenter_mapper_1.ToolPresenterMapper.toResponse(output);
    }
    async delete(id) {
        await this.deleteTool.execute(id);
    }
};
exports.ToolsController = ToolsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Crear herramienta', description: 'Crea una nueva herramienta en el inventario' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Herramienta creada exitosamente', type: tool_response_dto_1.ToolResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tool_request_dto_1.CreateToolRequestDto]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar herramientas', description: 'Obtiene una lista paginada de herramientas' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Número de página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, type: Number, description: 'Tamaño de página (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de herramientas obtenida' }),
    __param(0, (0, get_tenant_id_decorator_1.GetTenantId)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener herramienta', description: 'Obtiene los detalles de una herramienta por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la herramienta', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Herramienta encontrada', type: tool_response_dto_1.ToolResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Herramienta no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar herramienta', description: 'Actualiza los datos de una herramienta' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la herramienta', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Herramienta actualizada', type: tool_response_dto_1.ToolResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Herramienta no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tool_request_dto_1.UpdateToolRequestDto]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar herramienta', description: 'Elimina una herramienta del inventario' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la herramienta', type: String }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Herramienta eliminada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Herramienta no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "delete", null);
exports.ToolsController = ToolsController = __decorate([
    (0, swagger_1.ApiTags)('tools'),
    (0, swagger_1.ApiBearerAuth)('clerk'),
    (0, common_1.Controller)('tools'),
    (0, common_1.UseGuards)(clerk_auth_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [create_tool_use_case_1.CreateToolUseCase,
        list_tools_use_case_1.ListToolsUseCase,
        get_tool_use_case_1.GetToolUseCase,
        update_tool_use_case_1.UpdateToolUseCase,
        delete_tool_use_case_1.DeleteToolUseCase])
], ToolsController);
//# sourceMappingURL=tools.controller.js.map