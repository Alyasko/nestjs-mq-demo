import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/httpExceptionFilter';

import "./common/globalConfigService";
import { ValidationPipe } from '@nestjs/common';
import { apiConfig } from './common/globalConfigService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS Messaging Demo')
    .setDescription('Employee API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(apiConfig.apiPort);
}
bootstrap();
