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
exports.DeleteMaterialUseCase = void 0;
const common_1 = require("@nestjs/common");
const audit_writer_1 = require("../../../infrastructure/audit/audit.writer");
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
const material_repository_1 = require("../domain/material.repository");
let DeleteMaterialUseCase = class DeleteMaterialUseCase {
    materials;
    audit;
    constructor(materials, audit) {
        this.materials = materials;
        this.audit = audit;
    }
    async execute(id, actorId, tenantId) {
        const material = await this.materials.findById(id);
        if (!material)
            throw new domain_exception_1.NotFoundError('Material', id);
        await this.materials.softDelete(id);
        await this.audit.write({
            actorId,
            action: 'DELETE',
            entityType: 'Material',
            entityId: id,
            payload: { code: material.code, name: material.name },
            tenantId,
        });
    }
};
exports.DeleteMaterialUseCase = DeleteMaterialUseCase;
exports.DeleteMaterialUseCase = DeleteMaterialUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(material_repository_1.MATERIAL_REPOSITORY)),
    __metadata("design:paramtypes", [Object, audit_writer_1.AuditWriter])
], DeleteMaterialUseCase);
//# sourceMappingURL=delete-material.use-case.js.map