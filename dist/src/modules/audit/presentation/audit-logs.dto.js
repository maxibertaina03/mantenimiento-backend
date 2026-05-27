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
exports.PaginatedAuditLogsResponseDto = exports.AuditLogResponseDto = exports.ListAuditLogsQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class ListAuditLogsQueryDto {
    page;
    pageSize;
    entityType;
    entityId;
    actorId;
    action;
    from;
    to;
}
exports.ListAuditLogsQueryDto = ListAuditLogsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListAuditLogsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, maximum: 200, default: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], ListAuditLogsQueryDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListAuditLogsQueryDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListAuditLogsQueryDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'uuid' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ListAuditLogsQueryDto.prototype, "actorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.AuditAction }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AuditAction),
    __metadata("design:type", String)
], ListAuditLogsQueryDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ListAuditLogsQueryDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: 'date-time' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ListAuditLogsQueryDto.prototype, "to", void 0);
class AuditLogResponseDto {
    id;
    actorId;
    action;
    entityType;
    entityId;
    payload;
    ipAddress;
    userAgent;
    requestId;
    tenantId;
    createdAt;
    static from(r) {
        return {
            id: r.id,
            actorId: r.actorId,
            action: r.action,
            entityType: r.entityType,
            entityId: r.entityId,
            payload: r.payload,
            ipAddress: r.ipAddress,
            userAgent: r.userAgent,
            requestId: r.requestId,
            tenantId: r.tenantId,
            createdAt: r.createdAt.toISOString(),
        };
    }
}
exports.AuditLogResponseDto = AuditLogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], AuditLogResponseDto.prototype, "actorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AuditAction }),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AuditLogResponseDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AuditLogResponseDto.prototype, "payload", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AuditLogResponseDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AuditLogResponseDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], AuditLogResponseDto.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, format: 'uuid' }),
    __metadata("design:type", Object)
], AuditLogResponseDto.prototype, "tenantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], AuditLogResponseDto.prototype, "createdAt", void 0);
class PaginatedAuditLogsResponseDto {
    items;
    total;
    page;
    pageSize;
}
exports.PaginatedAuditLogsResponseDto = PaginatedAuditLogsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AuditLogResponseDto] }),
    __metadata("design:type", Array)
], PaginatedAuditLogsResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedAuditLogsResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedAuditLogsResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginatedAuditLogsResponseDto.prototype, "pageSize", void 0);
//# sourceMappingURL=audit-logs.dto.js.map