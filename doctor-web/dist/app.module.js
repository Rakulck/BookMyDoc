"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const env_schema_1 = require("./env.schema");
const env_config_1 = require("./common/config/env.config");
const ui_service_1 = require("./ui.service");
const health_module_1 = require("./common/health/health.module");
const core_1 = require("@nestjs/core");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const exception_filter_1 = require("./common/filters/exception.filter");
const auth_module_1 = require("./auth/auth.module");
const auth_middleware_1 = require("./auth/middleware/auth.middleware");
const roles_guard_1 = require("./auth/guard/roles.guard");
const firebase_module_1 = require("./firebase/firebase.module");
const profile_module_1 = require("./profile/profile.module");
const user_module_1 = require("./user/user.module");
const availability_module_1 = require("./availability/availability.module");
const booking_module_1 = require("./booking/booking.module");
const service_module_1 = require("./service/service.module");
const doctor_module_1 = require("./doctor/doctor.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: 'auth/login', method: common_1.RequestMethod.POST }, { path: 'auth/register', method: common_1.RequestMethod.POST }, { path: 'auth/verify-email', method: common_1.RequestMethod.POST })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot((0, env_config_1.getConfigOptions)(env_schema_1.envSchema)),
            serve_static_1.ServeStaticModule.forRootAsync({
                useClass: ui_service_1.UiService,
            }),
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            firebase_module_1.FirebaseModule,
            profile_module_1.ProfileModule,
            user_module_1.UserModule,
            availability_module_1.AvailabilityModule,
            booking_module_1.BookingModule,
            service_module_1.ServiceModule,
            doctor_module_1.DoctorModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            common_1.Logger,
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.ExceptionFilter,
            },
            {
                provide: 'APP_GUARD',
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map