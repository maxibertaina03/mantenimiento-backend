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
exports.UsageLogResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UsageLogResponseDto {
    id;
    machineId;
    hoursBefore;
    hoursAfter;
    delta;
    notes;
    createdById;
    createdAt;
    static from(log) {
        return {
            id: log.id,
            machineId: log.machineId,
            hoursBefore: log.hoursBefore.toString(),
            hoursAfter: log.hoursAfter.toString(),
            delta: log.delta.toString(),
            notes: log.notes,
            createdById: log.createdById,
            createdAt: log.createdAt.toISOString(),
        };
    }
}
exports.UsageLogResponseDto = UsageLogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], UsageLogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], UsageLogResponseDto.prototype, "machineId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UsageLogResponseDto.prototype, "hoursBefore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UsageLogResponseDto.prototype, "hoursAfter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UsageLogResponseDto.prototype, "delta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], UsageLogResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], UsageLogResponseDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'date-time' }),
    __metadata("design:type", String)
], UsageLogResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=usage-log-response.dto.js.map