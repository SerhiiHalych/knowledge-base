import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OutboxEntity } from '../entities/outbox.entity';
import { BaseAbstractRepository } from './base/base.adstract.repository';

@Injectable()
export class OutboxesRepository extends BaseAbstractRepository<OutboxEntity> {
  constructor(
    @InjectRepository(OutboxEntity)
    outboxEntity: Repository<OutboxEntity>,
  ) {
    super(outboxEntity);
  }
}
