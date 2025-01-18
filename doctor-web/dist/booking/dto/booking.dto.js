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
exports.BookingUpdateDto = exports.BookingCreateDto = exports.BookingDto = exports.ServiceDto = void 0;
const type_1 = require("../type");
const swagger_1 = require("@nestjs/swagger");
const availability_dto_1 = require("../../availability/dto/availability.dto");
const class_validator_1 = require("class-validator");
const profile_dto_1 = require("../../profile/dto/profile.dto");
const payment_dto_1 = require("./payment.dto");
const review_dto_1 = require("./review.dto");
class ServiceDto {
}
exports.ServiceDto = ServiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the service', example: 'serv123' }),
    __metadata("design:type", String)
], ServiceDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the service',
        example: 'Consultation',
    }),
    __metadata("design:type", String)
], ServiceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The description of the service',
        example: 'Consultation with doctor',
    }),
    __metadata("design:type", String)
], ServiceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The type of the service', example: 'General' }),
    __metadata("design:type", String)
], ServiceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The price of the service', example: 100 }),
    __metadata("design:type", Object)
], ServiceDto.prototype, "price_amount", void 0);
class BookingDto {
}
exports.BookingDto = BookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the booking', example: 'booking123' }),
    __metadata("design:type", String)
], BookingDto.prototype, "booking_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the customer', example: 'cust456' }),
    __metadata("design:type", String)
], BookingDto.prototype, "customer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the doctor', example: 'doc789' }),
    __metadata("design:type", String)
], BookingDto.prototype, "doctor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the service', example: 'ser589' }),
    __metadata("design:type", String)
], BookingDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the time slot', example: 'slot389' }),
    __metadata("design:type", String)
], BookingDto.prototype, "slot_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The status of the booking',
        enum: type_1.IBookingStatus,
    }),
    __metadata("design:type", String)
], BookingDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date of the booking',
        example: '2024-09-09',
    }),
    __metadata("design:type", String)
], BookingDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: profile_dto_1.ProfileDto,
        description: 'The customer info of the booking',
    }),
    __metadata("design:type", profile_dto_1.ProfileDto)
], BookingDto.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: profile_dto_1.ProfileDto,
        description: 'The doctor info of the booking',
    }),
    __metadata("design:type", profile_dto_1.ProfileDto)
], BookingDto.prototype, "doctor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: ServiceDto,
        description: 'The service of the booking',
    }),
    __metadata("design:type", ServiceDto)
], BookingDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: availability_dto_1.AvailabilitySlot,
        description: 'The slot of the booking',
    }),
    __metadata("design:type", availability_dto_1.AvailabilitySlot)
], BookingDto.prototype, "slot", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: payment_dto_1.PaymentDto,
        description: 'The payment of the booking',
    }),
    __metadata("design:type", payment_dto_1.PaymentDto)
], BookingDto.prototype, "payment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'The review of the booking' }),
    __metadata("design:type", review_dto_1.ReviewDto)
], BookingDto.prototype, "review", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'The history of the booking' }),
    __metadata("design:type", Object)
], BookingDto.prototype, "history", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The creation date of the booking',
        example: '2024-09-01T12:00:00Z',
    }),
    __metadata("design:type", String)
], BookingDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The last update date of the booking',
        example: '2024-09-02T12:00:00Z',
    }),
    __metadata("design:type", String)
], BookingDto.prototype, "updated_at", void 0);
class BookingCreateDto {
}
exports.BookingCreateDto = BookingCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the customer', example: 'cust456' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingCreateDto.prototype, "customer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the doctor', example: 'doc789' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingCreateDto.prototype, "doctor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the service', example: 'ser589' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingCreateDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the time slot', example: 'slot389' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingCreateDto.prototype, "slot_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date of the booking',
        example: '2024-09-09',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingCreateDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: payment_dto_1.PaymentDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", payment_dto_1.PaymentDto)
], BookingCreateDto.prototype, "payment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The creation date of the booking',
        example: '2024-09-01T12:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingCreateDto.prototype, "created_at", void 0);
class BookingUpdateDto {
}
exports.BookingUpdateDto = BookingUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the customer', example: 'cust456' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingUpdateDto.prototype, "customer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the doctor', example: 'doc789' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingUpdateDto.prototype, "doctor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the service', example: 'ser589' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingUpdateDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the time slot', example: 'slot389' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingUpdateDto.prototype, "slot_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The status of the booking',
        enum: type_1.IBookingStatus,
    }),
    (0, class_validator_1.IsEnum)(type_1.IBookingStatus),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => 'status' in o),
    __metadata("design:type", String)
], BookingUpdateDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date of the booking',
        example: '2024-09-09',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateIf)((o) => 'date' in o),
    __metadata("design:type", String)
], BookingUpdateDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: payment_dto_1.PaymentDto }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", payment_dto_1.PaymentDto)
], BookingUpdateDto.prototype, "payment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The creation date of the booking',
        example: '2024-09-01T12:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingUpdateDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The last update date of the booking',
        example: '2024-09-02T12:00:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BookingUpdateDto.prototype, "updated_at", void 0);
//# sourceMappingURL=booking.dto.js.map