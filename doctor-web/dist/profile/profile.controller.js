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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
require("multer");
const profile_service_1 = require("./profile.service");
const profile_dto_1 = require("./dto/profile.dto");
const roles_guard_1 = require("../auth/guard/roles.guard");
const swagger_1 = require("@nestjs/swagger");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfile(req) {
        const userId = req.user.uid;
        return this.profileService.getProfile(userId);
    }
    async updateProfile(req, profileDto, file) {
        const userId = req.user.uid;
        return this.profileService.updateProfile(userId, profileDto, file);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch profile details' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile fetched successfully.',
        type: profile_dto_1.ProfileDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request.',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { limits: { fileSize: 10 * 1024 * 1024 } })),
    (0, swagger_1.ApiOperation)({ summary: 'Update profile details' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', nullable: true },
                bio: { type: 'string', nullable: true },
                experience: {
                    type: 'string',
                    nullable: true,
                },
                expertiseList: {
                    type: 'array',
                    items: { type: 'string' },
                    nullable: true,
                },
                file: {
                    type: 'string',
                    format: 'binary',
                    nullable: true,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully.',
        type: profile_dto_1.ProfileDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfile", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('profile'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map