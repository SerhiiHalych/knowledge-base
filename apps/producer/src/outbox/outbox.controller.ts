import { OUTBOX_CLOSE_CMD } from '@app/shared/config/config';
import { OutboxEntity } from '@app/shared/entities/outbox.entity';
import { RabbitMqService } from '@app/shared/services/rabbitmq.service';
import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { OutboxService } from './outbox.service';

@Controller()
export class OutboxController {
  constructor(
    @Inject(OutboxService) private readonly outboxService: OutboxService,
    @Inject(RabbitMqService) private readonly rabbitMqService: RabbitMqService,
  ) {}

  @MessagePattern({ cmd: OUTBOX_CLOSE_CMD })
  close(
    @Ctx() context: RmqContext,
    @Payload() payload: { producerId?: string; id?: string },
  ): Promise<OutboxEntity> {
    this.rabbitMqService.acknowledgeMessage(context);

    if (payload.id) {
      return this.outboxService.closeByProducerId(payload.id);
    }

    return this.outboxService.closeByProducerId(payload.producerId);
  }
}
