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
const maintenance_controller_1 = require("./presentation/controllers/maintenance.controller");
const create_maintenance_order_use_case_1 = require("./application/use-cases/create-maintenance-order/create-maintenance-order.use-case");
const list_maintenance_orders_use_case_1 = require("./application/use-cases/list-maintenance-orders/list-maintenance-orders.use-case");
const get_maintenance_order_use_case_1 = require("./application/use-cases/get-maintenance-order/get-maintenance-order.use-case");
const start_maintenance_order_use_case_1 = require("./application/use-cases/start-maintenance-order/start-maintenance-order.use-case");
const complete_maintenance_order_use_case_1 = require("./application/use-cases/complete-maintenance-order/complete-maintenance-order.use-case");
const delete_maintenance_order_use_case_1 = require("./application/use-cases/delete-maintenance-order/delete-maintenance-order.use-case");
const prisma_maintenance_order_repository_1 = require("./infrastructure/repositories/prisma-maintenance-order.repository");
const maintenance_order_repository_1 = require("./domain/repositories/maintenance-order.repository");
const prisma_module_1 = require("../../infrastructure/prisma/prisma.module");
let MaintenanceModule = class MaintenanceModule {
};
exports.MaintenanceModule = MaintenanceModule;
exports.MaintenanceModule = MaintenanceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [maintenance_controller_1.MaintenanceController],
        providers: [
            create_maintenance_order_use_case_1.CreateMaintenanceOrderUseCase,
            list_maintenance_orders_use_case_1.ListMaintenanceOrdersUseCase,
            get_maintenance_order_use_case_1.GetMaintenanceOrderUseCase,
            start_maintenance_order_use_case_1.StartMaintenanceOrderUseCase,
            complete_maintenance_order_use_case_1.CompleteMaintenanceOrderUseCase,
            delete_maintenance_order_use_case_1.DeleteMaintenanceOrderUseCase,
            {
                provide: maintenance_order_repository_1.MAINTENANCE_ORDER_REPOSITORY,
                useClass: prisma_maintenance_order_repository_1.PrismaMaintenanceOrderRepository,
            },
        ],
        exports: [
            create_maintenance_order_use_case_1.CreateMaintenanceOrderUseCase,
            list_maintenance_orders_use_case_1.ListMaintenanceOrdersUseCase,
            get_maintenance_order_use_case_1.GetMaintenanceOrderUseCase,
            start_maintenance_order_use_case_1.StartMaintenanceOrderUseCase,
            complete_maintenance_order_use_case_1.CompleteMaintenanceOrderUseCase,
            delete_maintenance_order_use_case_1.DeleteMaintenanceOrderUseCase,
        ],
    })
], MaintenanceModule);
//# sourceMappingURL=maintenance.module.js.map