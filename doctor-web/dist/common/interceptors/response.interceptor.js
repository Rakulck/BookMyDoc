"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = exports.ApiResponseFormat = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
class ApiResponseFormat {
    constructor(response, statusCode = common_1.HttpStatus.OK) {
        this.metadata = {
            timestamp: new Date().toUTCString(),
        };
        this.statusCode = common_1.HttpStatus.OK;
        this.success = false;
        this.data = null;
        this.message = 'Request Success';
        this.metadata = { ...this.metadata, ...response.metadata };
        this.data = response.data || response;
        if (response?.message) {
            this.message = response.message;
        }
        this.statusCode = response?.statusCode || statusCode;
        if (this.statusCode >= common_1.HttpStatus.OK &&
            this.statusCode < common_1.HttpStatus.BAD_REQUEST) {
            this.success = true;
        }
        if (response?.error) {
            this.error = response.error;
        }
        if (this.data?.metadata) {
            delete this.data.metadata;
        }
    }
}
exports.ApiResponseFormat = ApiResponseFormat;
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((response) => {
            const res = new ApiResponseFormat(response, context.switchToHttp().getResponse().statusCode);
            context.switchToHttp().getResponse().status(res.statusCode);
            return res;
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map