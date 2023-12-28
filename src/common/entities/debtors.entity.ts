import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('debtors')
export class Debtors {
  @PrimaryGeneratedColumn({ name: 'debtor_id' })
  debtorId: number;

  @Column({ name: 'name' })
  name: string;
}
