import { RabbitMqService } from '@app/shared/services/rabbitmq.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const rabbitMqService = app.get(RabbitMqService);

  const queue = configService.get('CONSUMER_QUEUE');

  app.connectMicroservice(rabbitMqService.getRmqOptions(queue));
  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
