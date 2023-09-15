import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('outbox')
export class OutboxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payload: string;

  @Column()
  status: string;

  @Column()
  producerId: string;
}
