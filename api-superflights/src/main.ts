import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import {ValidationPipe} from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //TODO: SE USA PARA QUE EL EXCEPTION FILTER PUEDA ATRAPAR TODAS LAS EXCEPCIONES DEL PROGRAMA
  app.useGlobalFilters(new AllExceptionsFilter())

  //TODO: ESTAMOS ASIGNANDO EL INTECEPTOR TIMEOUT DE FORMA GLOBAL
  app.useGlobalInterceptors(new TimeOutInterceptor())

  //TODO: PARA USAR LAS VALIDACIONES DE CLASS VALIDATOR Y TRANSFORMER
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
