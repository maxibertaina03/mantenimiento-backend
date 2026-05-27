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
exports.ListMaterialsUseCase = void 0;
const common_1 = require("@nestjs/common");
const material_repository_1 = require("../domain/material.repository");
let ListMaterialsUseCase = class ListMaterialsUseCase {
    materials;
    constructor(materials) {
        this.materials = materials;
    }
    async execute(input) {
        const page = Math.max(1, input.page ?? 1);
        const pageSize = Math.min(100, Math.max(1, input.pageSize ?? 20));
        const { items, total } = await this.materials.list({
            skip: (page - 1) * pageSize,
            take: pageSize,
            search: input.search?.trim() || undefined,
            lowStockOnly: input.lowStockOnly,
        });
        return { items, total, page, pageSize };
    }
};
exports.ListMaterialsUseCase = ListMaterialsUseCase;
exports.ListMaterialsUseCase = ListMaterialsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(material_repository_1.MATERIAL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListMaterialsUseCase);
//# sourceMappingURL=list-materials.use-case.js.map