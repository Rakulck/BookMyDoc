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
exports.DoctorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const type_1 = require("../type");
const profile_dto_1 = require("../../profile/dto/profile.dto");
const availability_dto_1 = require("../../availability/dto/availability.dto");
const booking_dto_1 = require("../../booking/dto/booking.dto");
class DoctorDto extends profile_dto_1.ProfileDto {
}
exports.DoctorDto = DoctorDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ratings of the doctor' }),
    __metadata("design:type", Array)
], DoctorDto.prototype, "ratings", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'The star ratting' }),
    __metadata("design:type", Number)
], DoctorDto.prototype, "star_rating", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Services providing by the doctor',
        type: [booking_dto_1.ServiceDto],
    }),
    __metadata("design:type", Array)
], DoctorDto.prototype, "providingServices", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Availability days of the doctor',
        enum: () => [type_1.IDay],
    }),
    __metadata("design:type", Array)
], DoctorDto.prototype, "availability", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Availability slots of the doctor',
        type: [availability_dto_1.AvailabilitySlot],
    }),
    __metadata("design:type", Array)
], DoctorDto.prototype, "availabilitySlots", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Bookings of the doctor',
        type: () => [booking_dto_1.BookingDto],
    }),
    __metadata("design:type", Array)
], DoctorDto.prototype, "bookings", void 0);
//# sourceMappingURL=doctor.dto.js.map