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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const service_service_1 = require("./service.service");
const create_service_dto_1 = require("./dto/create-service.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/guard/roles.guard");
let ServiceController = class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    findAll() {
        return this.serviceService.findAll();
    }
    create(createServiceDto) {
        return this.serviceService.create(createServiceDto);
    }
    remove(id) {
        return this.serviceService.remove(+id);
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch Services for doctor' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Services fetched successfully.',
        type: [create_service_dto_1.ServiceDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create Service' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service created successfully.',
        type: create_service_dto_1.ServiceDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.ServiceDto]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Service' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service deleted successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request.',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "remove", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)('service'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('service'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
//# sourceMappingURL=service.controller.js.map