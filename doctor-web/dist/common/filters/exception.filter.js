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
exports.ExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const HttpException_1 = require("./HttpException");
let ExceptionFilter = class ExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        let status = response.statusCode >= common_1.HttpStatus.BAD_REQUEST
            ? response.statusCode
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let error = { code: status, message: 'Internal Server Error' };
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            error = (0, HttpException_1.HandleHttpException)(exception);
        }
        const resp = {
            metadata: {
                timestamp: new Date().toUTCString(),
                path: request.url,
            },
            statusCode: status,
            error,
            data: null,
            message: (common_1.HttpStatus[status] || error?.message).replaceAll(/-|_/g, ' '),
            success: false,
        };
        if (status >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(exception, exception?.stack);
        }
        else {
            this.logger.warn(exception);
        }
        return response.status(status).json(resp);
    }
};
exports.ExceptionFilter = ExceptionFilter;
exports.ExceptionFilter = ExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [common_1.Logger])
], ExceptionFilter);
//# sourceMappingURL=exception.filter.js.map