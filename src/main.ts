import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { openApiDocument } from './shared/external-pkgs/swagger/openApiDocument';
import { AppModule } from './shared/modules/app/app.module';
import { ExceptionGlobalFilter } from './shared/modules/app/filters/ExceptionGlobal.filter';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('server.port');

  app.useGlobalFilters(new ExceptionGlobalFilter(configService));

  const configurationSwaggerDocument = openApiDocument(app);
  SwaggerModule.setup('/api-docs', app, configurationSwaggerDocument);

  await app.listen(port);

  logger.log(`Server running in port: ${port}`, 'CoreApp');
}

bootstrap();
