import { RepositoryTokens, RqServiceToken } from '@app/shared/config/config';
import { ConsumerEntity } from '@app/shared/entities/consumer.entity';
import { PostgresDBModule } from '@app/shared/modules/postgresdb.module';
import { RabbitMqModule } from '@app/shared/modules/rabbitmq.module';
import { ConsumersRepository } from '@app/shared/repositories/consumers.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    PostgresDBModule,
    RabbitMqModule.registerRmq(
      RqServiceToken.PRODUCER_SERVICE,
      process.env.PRODUCER_QUEUE,
    ),
    TypeOrmModule.forFeature([ConsumerEntity]),
  ],
  controllers: [ConsumerController],
  providers: [
    ConsumerService,
    {
      provide: RepositoryTokens.CONSUMER_REPOSITORY_INTERFACE,
      useClass: ConsumersRepository,
    },
  ],
})
export class ConsumerModule {}
