import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producer')
export class ProducerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column()
  name: string;
}
