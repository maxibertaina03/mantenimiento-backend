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
const machines_controller_1 = require("./presentation/machines.controller");
const machine_repository_1 = require("./domain/machine.repository");
const prisma_machine_repository_1 = require("./infrastructure/prisma-machine.repository");
const register_machine_use_case_1 = require("./application/register-machine.use-case");
const update_machine_use_case_1 = require("./application/update-machine.use-case");
const change_machine_status_use_case_1 = require("./application/change-machine-status.use-case");
const log_machine_hours_use_case_1 = require("./application/log-machine-hours.use-case");
const list_machines_use_case_1 = require("./application/list-machines.use-case");
const get_machine_use_case_1 = require("./application/get-machine.use-case");
const delete_machine_use_case_1 = require("./application/delete-machine.use-case");
const get_preventive_alerts_use_case_1 = require("./application/get-preventive-alerts.use-case");
const list_usage_logs_use_case_1 = require("./application/list-usage-logs.use-case");
const machine_public_service_1 = require("./application/machine-public.service");
let MachinesModule = class MachinesModule {
};
exports.MachinesModule = MachinesModule;
exports.MachinesModule = MachinesModule = __decorate([
    (0, common_1.Module)({
        controllers: [machines_controller_1.MachinesController],
        providers: [
            { provide: machine_repository_1.MACHINE_REPOSITORY, useClass: prisma_machine_repository_1.PrismaMachineRepository },
            register_machine_use_case_1.RegisterMachineUseCase,
            update_machine_use_case_1.UpdateMachineUseCase,
            change_machine_status_use_case_1.ChangeMachineStatusUseCase,
            log_machine_hours_use_case_1.LogMachineHoursUseCase,
            list_machines_use_case_1.ListMachinesUseCase,
            get_machine_use_case_1.GetMachineUseCase,
            delete_machine_use_case_1.DeleteMachineUseCase,
            get_preventive_alerts_use_case_1.GetPreventiveAlertsUseCase,
            list_usage_logs_use_case_1.ListUsageLogsUseCase,
            machine_public_service_1.MachinePublicService,
        ],
        exports: [machine_public_service_1.MachinePublicService],
    })
], MachinesModule);
//# sourceMappingURL=machines.module.js.map