import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxService } from './outbox.service';
import { OutboxController } from './outbox.controller';

import { RepositoryTokens, RqServiceToken } from '@app/shared/config/config';
import { RabbitMqModule } from '@app/shared/modules/rabbitmq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboxEntity } from '@app/shared/entities/outbox.entity';
import { OutboxesRepository } from '@app/shared/repositories/outbox.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RabbitMqModule.registerRmq(
      RqServiceToken.CONSUMER_SERVICE,
      process.env.CONSUMER_QUEUE,
    ),
    TypeOrmModule.forFeature([OutboxEntity]),
  ],
  providers: [
    OutboxService,
    {
      provide: RepositoryTokens.OUTBOX_REPOSITORY_INTERFACE,
      useClass: OutboxesRepository,
    },
  ],
  controllers: [OutboxController],
})
export class OutboxModule {}
