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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityController = void 0;
const common_1 = require("@nestjs/common");
const availability_service_1 = require("./availability.service");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const type_1 = require("../common/types/type");
const availability_dto_1 = require("./dto/availability.dto");
const type_2 = require("./type");
let AvailabilityController = class AvailabilityController {
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
    }
    async getAvailabilitySlots(req, query) {
        const filters = {};
        if (req.user.role !== type_1.IRole.ADMIN) {
            filters.doctorId = req.user.uid;
        }
        if (query?.date) {
            const date = new Date(query?.date);
            filters.day = type_2.DAYS_Of_WEEK[date.getDay()];
        }
        return await this.availabilityService.getAvailabilitySlots(filters);
    }
    async saveAvailabilitySlots(req, body) {
        const userId = req.user.uid;
        const payload = body;
        if (!Array.isArray(payload)) {
            throw new common_1.HttpException('Invalid payload', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.availabilityService.saveAvailabilitySlots(userId, payload);
    }
};
exports.AvailabilityController = AvailabilityController;
__decorate([
    (0, common_1.Get)('/slots'),
    (0, roles_decorator_1.Roles)(type_1.IRole.DOCTOR, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get doctor availability' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'doctor availability slots response.',
        type: [availability_dto_1.AvailabilitySlot],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'doctor availability slots response.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "getAvailabilitySlots", null);
__decorate([
    (0, common_1.Post)('/slots'),
    (0, roles_decorator_1.Roles)(type_1.IRole.DOCTOR),
    (0, swagger_1.ApiOperation)({ summary: 'Save doctor availability slots' }),
    (0, swagger_1.ApiBody)({
        type: [availability_dto_1.AvailabilitySlot],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'doctor availability slots response.',
        type: [availability_dto_1.AvailabilitySlot],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'doctor availability slots response.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], AvailabilityController.prototype, "saveAvailabilitySlots", null);
exports.AvailabilityController = AvailabilityController = __decorate([
    (0, common_1.Controller)('availability'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('availability'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService])
], AvailabilityController);
//# sourceMappingURL=availability.controller.js.map