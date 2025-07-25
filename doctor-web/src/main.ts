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

  // Environment-aware CORS configuration
  const corsOrigins = process.env.NODE_ENV === 'production' 
    ? [
        'https://your-production-domain.com', // Replace with your actual production domain
        'https://your-vercel-domain.vercel.app', // Replace with your Vercel domain
        'http://142.93.179.32:3030', // Your production server IP
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

  let swaggerApiServer = `http://localhost:${process.env.PUBLISH_PORT || process.env.PORT}`;

  if (process.env.NODE_ENV === 'production') {
    swaggerApiServer = process.env.SWAGGER_SERVER || `http://142.93.179.32:3030`;
  }

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
  await app.listen(
    config.getOrThrow('PORT'),
    config.getOrThrow('HOSTNAME'),
    () => {
      console.log(
        `service listening on : ${config.getOrThrow('HOSTNAME')}:${config.getOrThrow('PORT')}}`,
      );
    },
  );
}
bootstrap();
