import { RabbitMqService } from '@app/shared/services/rabbitmq.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProducerModule } from './producer.module';

async function bootstrap() {
  const app = await NestFactory.create(ProducerModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const rabbitMqService = app.get(RabbitMqService);

  const queue = configService.get('PRODUCER_QUEUE');

  app.connectMicroservice(rabbitMqService.getRmqOptions(queue));
  await app.startAllMicroservices();
  const config = new DocumentBuilder()
    .setTitle('Outbox Pattern Example')
    .setDescription('This is a producer API')
    .setVersion('1.0')
    .addTag('Outboxes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
