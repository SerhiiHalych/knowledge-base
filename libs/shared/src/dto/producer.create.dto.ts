import { ApiProperty } from '@nestjs/swagger';

export class ProducerCreateDto {
  @ApiProperty({ description: 'Producer name', default: 'Steve', type: String })
  name: string;

  @ApiProperty({
    description: 'Producer description',
    default: 'Some random description',
    type: String,
  })
  desc: string;
}
