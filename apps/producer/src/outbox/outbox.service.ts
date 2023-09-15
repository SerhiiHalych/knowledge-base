import {
  CONSUMER_CREATE_CMD,
  OutboxStatusEnum,
  RepositoryTokens,
  RqServiceToken,
} from '@app/shared/config/config';
import { OutboxEntity } from '@app/shared/entities/outbox.entity';
import { OutboxesRepository } from '@app/shared/repositories/outbox.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class OutboxService {
  constructor(
    @Inject(RqServiceToken.CONSUMER_SERVICE)
    private readonly consumerRqService: ClientProxy,
    @Inject(RepositoryTokens.OUTBOX_REPOSITORY_INTERFACE)
    private readonly outboxesRepository: OutboxesRepository,
  ) {}

  public async closeById(id: string): Promise<OutboxEntity> {
    const outbox = await this.outboxesRepository.findOneById(id);

    // if we will receive more than one message
    if (outbox.status === OutboxStatusEnum.CLOSED) {
      return outbox;
    }

    outbox.status = OutboxStatusEnum.CLOSED;
    return this.outboxesRepository.save(outbox);
  }

  public async closeByProducerId(producerId: string): Promise<OutboxEntity> {
    const outbox = await this.outboxesRepository.findByCondition({
      where: { producerId },
    });

    // if we will receive more than one message
    if (outbox.status === OutboxStatusEnum.CLOSED) {
      return outbox;
    }

    outbox.status = OutboxStatusEnum.CLOSED;
    return this.outboxesRepository.save(outbox);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron(): Promise<void> {
    const outboxList = await this.outboxesRepository.findAll({
      where: { status: OutboxStatusEnum.OPENED },
    });

    outboxList.map((outbox) => {
      const { name, desc } = JSON.parse(outbox.payload);
      try {
        return this.consumerRqService
          .send(
            { cmd: CONSUMER_CREATE_CMD },
            { name, desc, producerId: outbox.producerId },
          )
          .subscribe();
      } catch (e) {
        console.error(e);
      }
    });
  }
}
