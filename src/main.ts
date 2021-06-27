import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/main/app.module';
import { PinoLoggerService } from './modules/logger/pino-logger.service';
import { setupSwagger } from './swagger';
import { useContainer } from 'class-validator';
import { TrimStringsPipe } from 'modules/common/transformer/trim-strings.pipe';
import { ASYNC_STORAGE } from 'modules/logger/constants';
import { v4 as uuidV4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });
  app.use((req, res, next) => {
    const asyncStorage = app.get(ASYNC_STORAGE);
    const traceId = req.headers['x-request-id'] || uuidV4();
    const store = new Map().set('traceId', traceId);
    asyncStorage.run(store, () => {
      next();
    })
  });
  app.useLogger(app.get(PinoLoggerService));
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new TrimStringsPipe(), new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
