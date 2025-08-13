"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dotenv = __importStar(require("dotenv"));
const express = __importStar(require("express"));
const path_1 = require("path");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'error', 'warn'],
    });
    const corsOrigins = process.env.NODE_ENV === 'production'
        ? [
            'https://your-production-domain.com',
            'https://your-vercel-domain.vercel.app',
            'http://142.93.179.32:3030',
        ]
        : [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3001',
        ];
    app.enableCors({
        origin: corsOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'Origin',
            'X-Requested-With',
        ],
        credentials: true,
    });
    app.setGlobalPrefix('api', { exclude: ['/health/(.*)', '/api-docs/(.*)'] });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        prefix: 'v',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    let swaggerApiServer = `http://localhost:${process.env.PUBLISH_PORT || process.env.PORT}`;
    if (process.env.NODE_ENV === 'production') {
        swaggerApiServer =
            process.env.SWAGGER_SERVER || `http://142.93.179.32:3030`;
    }
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Doctor Appointment Booking')
        .setDescription('Doctor Appointment Booking API description')
        .setVersion('1.0')
        .addServer(swaggerApiServer)
        .addTag('auth')
        .addTag('profile')
        .addTag('user')
        .addTag('service')
        .addTag('doctor')
        .addTag('availability')
        .addTag('booking')
        .addTag('health')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig, {
        extraModels: [],
    });
    swagger_1.SwaggerModule.setup('/api-docs', app, document, {
        customCss: '.topbar-wrapper a svg { visibility: hidden; }' +
            '.swagger-ui .topbar { display: none; }',
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.use('/api-docs', express.static((0, path_1.join)(__dirname, '..', 'node_modules', 'swagger-ui-dist')));
    const config = app.get(config_1.ConfigService);
    await app.listen(config.getOrThrow('PORT'), config.getOrThrow('HOSTNAME'), () => {
        console.log(`service listening on : ${config.getOrThrow('HOSTNAME')}:${config.getOrThrow('PORT')}}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map