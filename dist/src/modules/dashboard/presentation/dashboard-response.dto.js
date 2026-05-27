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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardStatsDto = exports.MaterialsStatsDto = exports.ToolsStatsDto = exports.MaintenanceStatsDto = exports.MachinesStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MachinesStatsDto {
    total;
    operational;
    inMaintenance;
    outOfService;
    preventiveDue;
}
exports.MachinesStatsDto = MachinesStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MachinesStatsDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MachinesStatsDto.prototype, "operational", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MachinesStatsDto.prototype, "inMaintenance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MachinesStatsDto.prototype, "outOfService", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MachinesStatsDto.prototype, "preventiveDue", void 0);
class MaintenanceStatsDto {
    pending;
    scheduled;
    inProgress;
    completedLast30d;
}
exports.MaintenanceStatsDto = MaintenanceStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceStatsDto.prototype, "pending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceStatsDto.prototype, "scheduled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceStatsDto.prototype, "inProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceStatsDto.prototype, "completedLast30d", void 0);
class ToolsStatsDto {
    total;
    available;
    onLoan;
    inRepair;
}
exports.ToolsStatsDto = ToolsStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ToolsStatsDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ToolsStatsDto.prototype, "available", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ToolsStatsDto.prototype, "onLoan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ToolsStatsDto.prototype, "inRepair", void 0);
class MaterialsStatsDto {
    total;
    lowStock;
}
exports.MaterialsStatsDto = MaterialsStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaterialsStatsDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaterialsStatsDto.prototype, "lowStock", void 0);
class DashboardStatsDto {
    machines;
    maintenance;
    tools;
    materials;
}
exports.DashboardStatsDto = DashboardStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: MachinesStatsDto }),
    __metadata("design:type", MachinesStatsDto)
], DashboardStatsDto.prototype, "machines", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MaintenanceStatsDto }),
    __metadata("design:type", MaintenanceStatsDto)
], DashboardStatsDto.prototype, "maintenance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ToolsStatsDto }),
    __metadata("design:type", ToolsStatsDto)
], DashboardStatsDto.prototype, "tools", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MaterialsStatsDto }),
    __metadata("design:type", MaterialsStatsDto)
], DashboardStatsDto.prototype, "materials", void 0);
//# sourceMappingURL=dashboard-response.dto.js.map