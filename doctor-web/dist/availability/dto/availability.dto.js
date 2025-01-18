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
exports.AvailabilitySlot = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const type_1 = require("../type");
class AvailabilitySlot {
}
exports.AvailabilitySlot = AvailabilitySlot;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The ID of the slot', example: 'slot123' }),
    __metadata("design:type", String)
], AvailabilitySlot.prototype, "slot_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'The doctor Id for the slot', example: 'uid456' }),
    __metadata("design:type", String)
], AvailabilitySlot.prototype, "uid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'The day of the slot', enum: type_1.IDay }),
    __metadata("design:type", String)
], AvailabilitySlot.prototype, "day", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Start time of the slot', example: '09:00' }),
    __metadata("design:type", String)
], AvailabilitySlot.prototype, "start_time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'End time of the slot', example: '10:00' }),
    __metadata("design:type", String)
], AvailabilitySlot.prototype, "end_time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Duration of the slot in minutes',
        example: 60,
    }),
    __metadata("design:type", Number)
], AvailabilitySlot.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Slot created at',
        example: '2024-09-01T12:00:00Z',
    }),
    __metadata("design:type", String)
], AvailabilitySlot.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Slot updated at',
        example: '2024-09-01T12:00:00Z',
    }),
    __metadata("design:type", String)
], AvailabilitySlot.prototype, "updated_at", void 0);
//# sourceMappingURL=availability.dto.js.map