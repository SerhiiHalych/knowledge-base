import { TransactionTokens } from '@app/shared/config/config';
import { ProducerCreateDto } from '@app/shared/dto/producer.create.dto';
import { ProducerEntity } from '@app/shared/entities/producer.entity';
import { CreateProducerTransaction } from '@app/shared/transactions/CreateProducerTransaction';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProducerService {
  constructor(
    @Inject(TransactionTokens.CREATE_PRODUCER_TRANSACTION_INTERFACE)
    private readonly createProducerTransaction: CreateProducerTransaction,
  ) {}

  create(dto: ProducerCreateDto): Promise<ProducerEntity> {
    return this.createProducerTransaction.run(dto);
  }
}
