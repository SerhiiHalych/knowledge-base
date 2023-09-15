import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsumerEntity } from '../entities/consumer.entity';
import { BaseAbstractRepository } from './base/base.adstract.repository';

@Injectable()
export class ConsumersRepository extends BaseAbstractRepository<ConsumerEntity> {
  constructor(
    @InjectRepository(ConsumerEntity)
    consumerEntity: Repository<ConsumerEntity>,
  ) {
    super(consumerEntity);
  }
}
