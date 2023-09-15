import {
  OUTBOX_CLOSE_CMD,
  RepositoryTokens,
  RqServiceToken,
} from '@app/shared/config/config';
import { ConsumerCreateDto } from '@app/shared/dto/consumer.create.dto';
import { ConsumerEntity } from '@app/shared/entities/consumer.entity';
import { ConsumersRepository } from '@app/shared/repositories/consumers.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ConsumerService {
  constructor(
    @Inject(RqServiceToken.PRODUCER_SERVICE)
    private readonly producerRqService: ClientProxy,
    @Inject(RepositoryTokens.CONSUMER_REPOSITORY_INTERFACE)
    private readonly consumersRepository: ConsumersRepository,
  ) {}

  // since we can receive more than one message we always need to check if it's already created
  async create(dto: ConsumerCreateDto): Promise<ConsumerEntity> {
    let consumer = await this.consumersRepository.findByCondition({
      where: { producerId: dto.producerId.toString() },
    });

    if (!consumer) {
      consumer = await this.consumersRepository.save({ ...dto });
    }

    this.producerRqService
      .send({ cmd: OUTBOX_CLOSE_CMD }, { producerId: consumer.producerId })
      .subscribe();

    return consumer;
  }
}
