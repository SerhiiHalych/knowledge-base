import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consumer')
export class ConsumerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  desc: string;

  @Column()
  producerId: string;
}
