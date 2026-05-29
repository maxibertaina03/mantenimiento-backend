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
exports.CreateMachineUseCase = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const library_1 = require("@prisma/client/runtime/library");
const machine_entity_1 = require("../../../domain/entities/machine.entity");
const machine_repository_1 = require("../../../domain/repositories/machine.repository");
const machine_status_vo_1 = require("../../../domain/value-objects/machine-status.vo");
const invalid_machine_exception_1 = require("../../../domain/exceptions/invalid-machine.exception");
const machine_app_mapper_1 = require("../../mappers/machine-app.mapper");
let CreateMachineUseCase = class CreateMachineUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const machine = new machine_entity_1.Machine((0, uuid_1.v4)(), input.code, input.name, input.status ?? machine_status_vo_1.MachineStatus.OPERATIONAL, input.usageHours ?? new library_1.Decimal(0), input.brand ?? null, input.model ?? null, input.serialNumber ?? null, input.location ?? null, input.responsibleId ?? null, input.notes ?? null, input.preventiveIntervalHours ?? null, null, null);
        const existingMachine = await this.repository.findByCode(machine.getCode());
        if (existingMachine) {
            throw new invalid_machine_exception_1.InvalidMachineException(`Machine with code "${machine.getCode()}" already exists`);
        }
        await this.repository.save(machine);
        return machine_app_mapper_1.MachineAppMapper.toOutput(machine);
    }
};
exports.CreateMachineUseCase = CreateMachineUseCase;
exports.CreateMachineUseCase = CreateMachineUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(machine_repository_1.MACHINE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateMachineUseCase);
//# sourceMappingURL=create-machine.use-case.js.map