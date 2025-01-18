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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const type_1 = require("../common/types/type");
const filters_dto_1 = require("./dto/filters.dto");
const doctor_dto_1 = require("./dto/doctor.dto");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    async getDoctors(req, query) {
        const filters = { ...query };
        const userRole = req?.user?.role;
        return await this.doctorService.getDoctors(filters, userRole);
    }
    async getDoctorDetails(req, doctorId) {
        if (!doctorId) {
            throw new common_1.HttpException('Doctor id is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const userRole = req?.user?.role;
        return await this.doctorService.getDoctorDetails(doctorId, userRole);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Get)('/'),
    (0, roles_decorator_1.Roles)(type_1.IRole.CUSTOMER, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get doctors' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'doctors response.',
        type: [doctor_dto_1.DoctorDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'doctors response.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filters_dto_1.DoctorFilterDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctors", null);
__decorate([
    (0, common_1.Get)('/:doctor_id'),
    (0, roles_decorator_1.Roles)(type_1.IRole.CUSTOMER, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get doctor details' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'doctor details response.',
        type: () => doctor_dto_1.DoctorDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'doctor details response.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('doctor_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorDetails", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('doctors'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('doctor'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map