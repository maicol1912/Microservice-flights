import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilters } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //TODO: CONTROLAR EXCEPVIONES GLOBALES
  app.useGlobalFilters(new AllExceptionFilters())

  //TODO:  INTERCEPTORES GLOBALES
  app.useGlobalInterceptors(new TimeOutInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
