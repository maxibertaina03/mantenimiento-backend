"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachinesModule = void 0;
const common_1 = require("@nestjs/common");
const machines_controller_1 = require("./presentation/controllers/machines.controller");
const create_machine_use_case_1 = require("./application/use-cases/create-machine/create-machine.use-case");
const list_machines_use_case_1 = require("./application/use-cases/list-machines/list-machines.use-case");
const get_machine_use_case_1 = require("./application/use-cases/get-machine/get-machine.use-case");
const update_machine_use_case_1 = require("./application/use-cases/update-machine/update-machine.use-case");
const delete_machine_use_case_1 = require("./application/use-cases/delete-machine/delete-machine.use-case");
const prisma_machine_repository_1 = require("./infrastructure/repositories/prisma-machine.repository");
const machine_repository_1 = require("./domain/repositories/machine.repository");
const prisma_module_1 = require("../../infrastructure/prisma/prisma.module");
let MachinesModule = class MachinesModule {
};
exports.MachinesModule = MachinesModule;
exports.MachinesModule = MachinesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [machines_controller_1.MachinesController],
        providers: [
            create_machine_use_case_1.CreateMachineUseCase,
            list_machines_use_case_1.ListMachinesUseCase,
            get_machine_use_case_1.GetMachineUseCase,
            update_machine_use_case_1.UpdateMachineUseCase,
            delete_machine_use_case_1.DeleteMachineUseCase,
            {
                provide: machine_repository_1.MACHINE_REPOSITORY,
                useClass: prisma_machine_repository_1.PrismaMachineRepository,
            },
        ],
        exports: [create_machine_use_case_1.CreateMachineUseCase, list_machines_use_case_1.ListMachinesUseCase, get_machine_use_case_1.GetMachineUseCase, update_machine_use_case_1.UpdateMachineUseCase, delete_machine_use_case_1.DeleteMachineUseCase],
    })
], MachinesModule);
//# sourceMappingURL=machines.module.js.map