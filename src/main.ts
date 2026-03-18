import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerErrorInterceptor, Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { APP_DEFAULTS, ENV_KEYS } from './constants';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(PinoLogger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(new PrismaExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('Inventory management API')
    .setVersion('1.0')
    .addTag('health')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env[ENV_KEYS.PORT] ?? APP_DEFAULTS.PORT;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`Application running on port ${port}`);
  logger.log(`Swagger docs: http://localhost:${port}/api`);
}
bootstrap();
