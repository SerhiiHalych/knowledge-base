import { ProducerCreateDto } from '@app/shared/dto/producer.create.dto';
import { ProducerEntity } from '@app/shared/entities/producer.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller()
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('producer/create')
  create(@Body() dto: ProducerCreateDto): Promise<ProducerEntity> {
    return this.producerService.create(dto);
  }
}
