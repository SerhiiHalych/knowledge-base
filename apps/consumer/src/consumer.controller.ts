import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { CONSUMER_CREATE_CMD } from '@app/shared/config/config';
import { RabbitMqService } from '@app/shared/services/rabbitmq.service';
import { ConsumerEntity } from '@app/shared/entities/consumer.entity';

@Controller()
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly rabbitMqService: RabbitMqService,
  ) {}

  @MessagePattern({ cmd: CONSUMER_CREATE_CMD })
  create(
    @Ctx() context: RmqContext,
    @Payload() payload: { name: string; desc: string; producerId: string },
  ): Promise<ConsumerEntity> {
    this.rabbitMqService.acknowledgeMessage(context);

    return this.consumerService.create(payload);
  }
}
