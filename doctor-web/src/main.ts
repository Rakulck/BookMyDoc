import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@app/app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  app.enableCors({
    // origin: ['http://localhost:3000', 'http://localhost:3001'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.setGlobalPrefix('api', { exclude: ['/health/(.*)', '/api/docs/(.*)'] });
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
    swaggerApiServer = `http://142.93.179.32:3030`;
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

  SwaggerModule.setup('/api/docs', app, document, {
    customCss:
      '.topbar-wrapper a svg { visibility: hidden; }' +
      '.swagger-ui .topbar { display: none; }',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

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
