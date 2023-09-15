import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { OutboxStatusEnum } from '../config/config';
import { ProducerCreateDto } from '../dto/producer.create.dto';
import { OutboxEntity } from '../entities/outbox.entity';
import { ProducerEntity } from '../entities/producer.entity';
import { BaseTransaction } from './base/base.transaction';

@Injectable()
export class CreateProducerTransaction extends BaseTransaction<
  ProducerCreateDto,
  ProducerEntity
> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  // the important thing here is to use the manager that we've created in the base class
  protected async execute(
    data: ProducerCreateDto,
    manager: EntityManager,
  ): Promise<ProducerEntity> {
    const newProducer = await manager.save(ProducerEntity, data);

    await manager.save(OutboxEntity, {
      status: OutboxStatusEnum.OPENED,
      producerId: newProducer.id.toString(),
      payload: JSON.stringify({
        name: newProducer.name,
        desc: newProducer.desc,
      }),
    });

    return newProducer;
  }
}
