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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const type_1 = require("../common/types/type");
const booking_dto_1 = require("./dto/booking.dto");
const filters_dto_1 = require("./dto/filters.dto");
const payment_dto_1 = require("./dto/payment.dto");
const review_dto_1 = require("./dto/review.dto");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async getBookings(req, query) {
        const filters = {};
        if (req.user.role !== type_1.IRole.ADMIN) {
            if (req.user?.role === type_1.IRole.CUSTOMER) {
                filters.customer_id = req.user.uid;
            }
            if (req.user?.role === type_1.IRole.DOCTOR) {
                filters.doctor_id = req.user.uid;
            }
        }
        if (query?.status) {
            filters.status = query?.status;
        }
        if (query?.order_by) {
            filters.order_by = query?.order_by?.toLowerCase();
        }
        return await this.bookingService.getBookings(filters, req.user.role);
    }
    async getBooking(bookingId, req) {
        const filters = {};
        if (req.user.role !== type_1.IRole.ADMIN) {
            if (req.user?.role === type_1.IRole.CUSTOMER) {
                filters.customer_id = req.user.uid;
            }
            if (req.user?.role === type_1.IRole.DOCTOR) {
                filters.doctor_id = req.user.uid;
            }
        }
        return await this.bookingService.getSingleBooking(bookingId, filters, req.user.role);
    }
    async createBookingPayment(req, body) {
        if (req.user.role !== type_1.IRole.ADMIN) {
            body.customer_id = req.user.uid;
        }
        if (!body?.customer_id) {
            throw new common_1.HttpException('Customer id require!', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.bookingService.createBookingPayment(body);
    }
    async createBooking(req, body) {
        if (req.user.role !== type_1.IRole.ADMIN) {
            body.customer_id = req.user.uid;
        }
        if (!body?.customer_id) {
            throw new common_1.HttpException('Customer id require!', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.bookingService.createBooking(body, req.user);
    }
    async updateBooking(bookingId, req, body) {
        if (!bookingId) {
            throw new common_1.HttpException('Booking Id is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const filters = {};
        if (req.user.role !== type_1.IRole.ADMIN) {
            if (req.user?.role === type_1.IRole.CUSTOMER) {
                filters.customer_id = req.user.uid;
            }
            if (req.user?.role === type_1.IRole.DOCTOR) {
                filters.doctor_id = req.user.uid;
            }
        }
        return await this.bookingService.updateBooking(bookingId, filters, body, req.user);
    }
    async addBookingReview(bookingId, req, body) {
        if (!bookingId) {
            throw new common_1.HttpException('Booking Id is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const filters = {};
        if (req.user?.role === type_1.IRole.CUSTOMER) {
            filters.customer_id = req.user.uid;
        }
        return await this.bookingService.addBookingReview(bookingId, filters, body, req.user);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Get)('/'),
    (0, roles_decorator_1.Roles)(type_1.IRole.CUSTOMER, type_1.IRole.DOCTOR, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get Bookings' }),
    (0, swagger_1.ApiQuery)({
        name: 'filters',
        type: filters_dto_1.BookingFilterDto,
        description: 'Filter criteria for booking',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'get user bookings success response.',
        type: [booking_dto_1.BookingDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'get user bookings error response.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookings", null);
__decorate([
    (0, common_1.Get)('/:booking_id'),
    (0, roles_decorator_1.Roles)(type_1.IRole.CUSTOMER, type_1.IRole.DOCTOR, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get Booking' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'get user booking success response.',
        type: booking_dto_1.BookingDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'get user booking error response.',
    }),
    __param(0, (0, common_1.Param)('booking_id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBooking", null);
__decorate([
    (0, common_1.Post)('/payment'),
    (0, roles_decorator_1.Roles)(type_1.IRole.CUSTOMER, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create Payment' }),
    (0, swagger_1.ApiBody)({
        type: payment_dto_1.CreatePaymentDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Create payment success response.',
        type: booking_dto_1.BookingDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Create payment error response.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBookingPayment", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)(type_1.IRole.CUSTOMER, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create Booking' }),
    (0, swagger_1.ApiBody)({
        type: booking_dto_1.BookingCreateDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Create booking success response.',
        type: booking_dto_1.BookingDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Create booking error response.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, booking_dto_1.BookingCreateDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Put)('/:booking_id'),
    (0, roles_decorator_1.Roles)(type_1.IRole.CUSTOMER, type_1.IRole.DOCTOR, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update Booking' }),
    (0, swagger_1.ApiParam)({
        name: 'booking_id',
        type: 'string',
        description: 'Booking Id',
    }),
    (0, swagger_1.ApiBody)({
        type: booking_dto_1.BookingUpdateDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update booking success response.',
        type: booking_dto_1.BookingDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Update booking error response.',
    }),
    __param(0, (0, common_1.Param)('booking_id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, booking_dto_1.BookingUpdateDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "updateBooking", null);
__decorate([
    (0, common_1.Post)('/:booking_id/review'),
    (0, roles_decorator_1.Roles)(type_1.IRole.CUSTOMER, type_1.IRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Add Booking Review' }),
    (0, swagger_1.ApiParam)({
        name: 'booking_id',
        type: 'string',
        description: 'Booking Id',
    }),
    (0, swagger_1.ApiBody)({
        type: review_dto_1.ReviewDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Add booking success review response.',
        type: booking_dto_1.BookingDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Add booking review error response.',
    }),
    __param(0, (0, common_1.Param)('booking_id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, review_dto_1.ReviewDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "addBookingReview", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('bookings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('booking'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map