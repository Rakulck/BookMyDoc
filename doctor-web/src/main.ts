import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@app/app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  // Allow all origins in development, restrict in production
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://your-production-domain.com',
            'https://your-vercel-domain.vercel.app',
            'http://142.93.179.32:3030',
          ]
        : '*', // Allow all origins in development
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
    type: VersioningType.URI,
    prefix: 'v',
  });

  // global validation enabled..
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Get the local IP for development
  const localIP = process.env.LOCAL_IP || '192.168.1.7'; // You can make this dynamic if needed
  const port = process.env.PORT || 8080;

  const swaggerApiServer =
    process.env.NODE_ENV === 'production'
      ? process.env.SWAGGER_SERVER || `http://142.93.179.32:3030`
      : `http://${localIP}:${port}`;

  const swaggerConfig = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [],
  });

  SwaggerModule.setup('/api-docs', app, document, {
    customCss:
      '.topbar-wrapper a svg { visibility: hidden; }' +
      '.swagger-ui .topbar { display: none; }',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.use(
    '/api-docs',
    express.static(join(__dirname, '..', 'node_modules', 'swagger-ui-dist')),
  );

  const config = app.get(ConfigService);

  // Log environment and configuration
  console.log('🔧 [Server Config]:', {
    NODE_ENV: process.env.NODE_ENV || 'not set',
    PORT: config.getOrThrow('PORT'),
    HOSTNAME: config.getOrThrow('HOSTNAME'),
    CORS_ENABLED: true,
    CORS_ORIGIN: process.env.NODE_ENV === 'production' ? 'restricted' : '*',
  });

  // Always bind to all interfaces (0.0.0.0)
  await app.listen(port, '0.0.0.0', () => {
    console.log('✨ [Server Status]:', {
      localUrl: `http://localhost:${port}`,
      networkUrl: `http://${localIP}:${port}`,
      apiDocs: {
        local: `http://localhost:${port}/api-docs`,
        network: `http://${localIP}:${port}/api-docs`,
      },
      mode: process.env.NODE_ENV || 'development',
    });
  });
}
bootstrap();
