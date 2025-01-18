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
exports.ServiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ServiceDto {
}
exports.ServiceDto = ServiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the service',
        example: 'Consultation',
    }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name cannot be empty' }),
    __metadata("design:type", String)
], ServiceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the service',
        example: 'A detailed consultation service including initial assessment and follow-up.',
    }),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description cannot be empty' }),
    __metadata("design:type", String)
], ServiceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the service',
        example: 'Medical',
    }),
    (0, class_validator_1.IsString)({ message: 'Type must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Type cannot be empty' }),
    __metadata("design:type", String)
], ServiceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price amount for the service',
        example: 150.0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Price amount must be a number' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Price amount cannot be empty' }),
    __metadata("design:type", Number)
], ServiceDto.prototype, "price_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Icon for the service',
        example: 'medical-outline',
    }),
    (0, class_validator_1.IsString)({ message: 'Icon name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Icon name cannot be empty' }),
    __metadata("design:type", String)
], ServiceDto.prototype, "icon_name", void 0);
//# sourceMappingURL=create-service.dto.js.map