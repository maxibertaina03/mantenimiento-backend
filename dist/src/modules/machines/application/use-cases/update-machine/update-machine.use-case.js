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
exports.UpdateMachineUseCase = exports.UpdateMachineInput = void 0;
const common_1 = require("@nestjs/common");
const machine_repository_1 = require("../../../domain/repositories/machine.repository");
const machine_not_found_exception_1 = require("../../../domain/exceptions/machine-not-found.exception");
const machine_app_mapper_1 = require("../../mappers/machine-app.mapper");
class UpdateMachineInput {
    id;
    name;
    location;
}
exports.UpdateMachineInput = UpdateMachineInput;
let UpdateMachineUseCase = class UpdateMachineUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const machine = await this.repository.findById(input.id);
        if (!machine)
            throw new machine_not_found_exception_1.MachineNotFoundException(input.id);
        if (input.name)
            machine.changeName(input.name);
        if (input.location !== undefined)
            machine.updateLocation(input.location);
        await this.repository.save(machine);
        return machine_app_mapper_1.MachineAppMapper.toOutput(machine);
    }
};
exports.UpdateMachineUseCase = UpdateMachineUseCase;
exports.UpdateMachineUseCase = UpdateMachineUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(machine_repository_1.MACHINE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateMachineUseCase);
//# sourceMappingURL=update-machine.use-case.js.map