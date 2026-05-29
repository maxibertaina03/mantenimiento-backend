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
exports.UpdateMaterialUseCase = exports.UpdateMaterialInput = void 0;
const common_1 = require("@nestjs/common");
const material_repository_1 = require("../../../domain/repositories/material.repository");
const material_not_found_exception_1 = require("../../../domain/exceptions/material-not-found.exception");
const material_app_mapper_1 = require("../../mappers/material-app.mapper");
class UpdateMaterialInput {
    id;
    name;
    location;
}
exports.UpdateMaterialInput = UpdateMaterialInput;
let UpdateMaterialUseCase = class UpdateMaterialUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const material = await this.repository.findById(input.id);
        if (!material)
            throw new material_not_found_exception_1.MaterialNotFoundException(input.id);
        if (input.name)
            material.changeName(input.name);
        if (input.location !== undefined)
            material.updateLocation(input.location);
        await this.repository.save(material);
        return material_app_mapper_1.MaterialAppMapper.toOutput(material);
    }
};
exports.UpdateMaterialUseCase = UpdateMaterialUseCase;
exports.UpdateMaterialUseCase = UpdateMaterialUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(material_repository_1.MATERIAL_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateMaterialUseCase);
//# sourceMappingURL=update-material.use-case.js.map