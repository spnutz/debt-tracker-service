import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger({
    //   format: format.combine(
    //     format.timestamp(),
    //     format.errors({ stack: true }),
    //     format.json(),
    //   ),
    //   transports: Object.assign(
    //     new transports.Console({
    //       handleExceptions: true,
    //     }),
    //     {
    //       handleRejections: true,
    //     },
    //   ),
    // }),
  });

  const documentConfig = new DocumentBuilder()
    .setTitle('Auth Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(AppConfigService.getEnvPort());
}
bootstrap();
