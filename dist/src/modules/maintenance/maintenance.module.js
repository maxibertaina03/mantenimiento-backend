"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceModule = void 0;
const common_1 = require("@nestjs/common");
const machines_module_1 = require("../machines/machines.module");
const maintenance_controller_1 = require("./presentation/maintenance.controller");
const maintenance_repository_1 = require("./domain/maintenance.repository");
const prisma_maintenance_repository_1 = require("./infrastructure/prisma-maintenance.repository");
const schedule_maintenance_use_case_1 = require("./application/schedule-maintenance.use-case");
const start_maintenance_use_case_1 = require("./application/start-maintenance.use-case");
const complete_maintenance_use_case_1 = require("./application/complete-maintenance.use-case");
const cancel_maintenance_use_case_1 = require("./application/cancel-maintenance.use-case");
const update_maintenance_use_case_1 = require("./application/update-maintenance.use-case");
const list_maintenance_use_case_1 = require("./application/list-maintenance.use-case");
const get_maintenance_use_case_1 = require("./application/get-maintenance.use-case");
let MaintenanceModule = class MaintenanceModule {
};
exports.MaintenanceModule = MaintenanceModule;
exports.MaintenanceModule = MaintenanceModule = __decorate([
    (0, common_1.Module)({
        imports: [machines_module_1.MachinesModule],
        controllers: [maintenance_controller_1.MaintenanceController],
        providers: [
            { provide: maintenance_repository_1.MAINTENANCE_REPOSITORY, useClass: prisma_maintenance_repository_1.PrismaMaintenanceRepository },
            schedule_maintenance_use_case_1.ScheduleMaintenanceUseCase,
            start_maintenance_use_case_1.StartMaintenanceUseCase,
            complete_maintenance_use_case_1.CompleteMaintenanceUseCase,
            cancel_maintenance_use_case_1.CancelMaintenanceUseCase,
            update_maintenance_use_case_1.UpdateMaintenanceUseCase,
            list_maintenance_use_case_1.ListMaintenanceUseCase,
            get_maintenance_use_case_1.GetMaintenanceUseCase,
        ],
    })
], MaintenanceModule);
//# sourceMappingURL=maintenance.module.js.map