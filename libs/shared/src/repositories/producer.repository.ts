import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerEntity } from '../entities/producer.entity';
import { BaseAbstractRepository } from './base/base.adstract.repository';

@Injectable()
export class ProducersRepository extends BaseAbstractRepository<ProducerEntity> {
  constructor(
    @InjectRepository(ProducerEntity)
    ProducerEntity: Repository<ProducerEntity>,
  ) {
    super(ProducerEntity);
  }
}
