"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMaintenanceOrdersOutput = exports.MaintenanceOrderListItemDto = void 0;
class MaintenanceOrderListItemDto {
    id;
    machineId;
    type;
    status;
    location;
    scheduledFor;
    startedAt;
    createdAt;
}
exports.MaintenanceOrderListItemDto = MaintenanceOrderListItemDto;
class ListMaintenanceOrdersOutput {
    items;
    total;
    page;
    pageSize;
}
exports.ListMaintenanceOrdersOutput = ListMaintenanceOrdersOutput;
//# sourceMappingURL=list-maintenance-orders.output.js.map