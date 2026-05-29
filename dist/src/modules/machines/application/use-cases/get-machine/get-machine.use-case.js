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
exports.GetMachineUseCase = void 0;
const common_1 = require("@nestjs/common");
const machine_repository_1 = require("../../../domain/repositories/machine.repository");
const machine_not_found_exception_1 = require("../../../domain/exceptions/machine-not-found.exception");
const machine_app_mapper_1 = require("../../mappers/machine-app.mapper");
let GetMachineUseCase = class GetMachineUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        const machine = await this.repository.findById(id);
        if (!machine)
            throw new machine_not_found_exception_1.MachineNotFoundException(id);
        return machine_app_mapper_1.MachineAppMapper.toOutput(machine);
    }
};
exports.GetMachineUseCase = GetMachineUseCase;
exports.GetMachineUseCase = GetMachineUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(machine_repository_1.MACHINE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetMachineUseCase);
//# sourceMappingURL=get-machine.use-case.js.map