import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // In dev, disable HSTS and CSP upgrade so Safari/Chrome don't auto-switch to HTTPS
  const isProd = process.env.NODE_ENV === 'production';
  app.use(
    helmet(
      isProd
        ? undefined
        : {
            hsts: false,
            contentSecurityPolicy: {
              useDefaults: true,
              directives: {
                // Remove the HTTPS auto-upgrade that breaks local HTTP
                // Helmet expects this key as a string
                'upgrade-insecure-requests': null,
              },
            },
          }
    )
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const origin = process.env.CORS_ORIGIN || 'http://localhost:8080';
  app.enableCors({
    origin,
    credentials: false, // no cookies used in this simple MVP
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Authentication endpoints')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
}

bootstrap();
