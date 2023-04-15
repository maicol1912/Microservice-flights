import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQ } from './common/constants/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.RMQ,
    options:{
      urls:process.env.AMQP_URL,
      queue: RabbitMQ.userQueue
    },
  });
  await app.listen();
  console.log('Microservice user is listening')
}
bootstrap();
