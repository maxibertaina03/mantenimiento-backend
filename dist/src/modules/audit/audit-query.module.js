"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditQueryModule = void 0;
const common_1 = require("@nestjs/common");
const audit_logs_controller_1 = require("./presentation/audit-logs.controller");
const list_audit_logs_use_case_1 = require("./application/list-audit-logs.use-case");
let AuditQueryModule = class AuditQueryModule {
};
exports.AuditQueryModule = AuditQueryModule;
exports.AuditQueryModule = AuditQueryModule = __decorate([
    (0, common_1.Module)({
        controllers: [audit_logs_controller_1.AuditLogsController],
        providers: [list_audit_logs_use_case_1.ListAuditLogsUseCase],
    })
], AuditQueryModule);
//# sourceMappingURL=audit-query.module.js.map