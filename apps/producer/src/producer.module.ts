import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { OutboxModule } from './outbox/outbox.module';
import { PostgresDBModule } from '@app/shared/modules/postgresdb.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerEntity } from '@app/shared/entities/producer.entity';
import { CreateProducerTransaction } from '@app/shared/transactions/CreateProducerTransaction';
import { TransactionTokens } from '@app/shared/config/config';

@Module({
  imports: [
    OutboxModule,
    PostgresDBModule,
    TypeOrmModule.forFeature([ProducerEntity]),
  ],
  controllers: [ProducerController],
  providers: [
    ProducerService,
    {
      provide: TransactionTokens.CREATE_PRODUCER_TRANSACTION_INTERFACE,
      useClass: CreateProducerTransaction,
    },
  ],
})
export class ProducerModule {}
