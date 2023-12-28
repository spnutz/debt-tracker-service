import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('debts')
export class Debts {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'debtor_id' })
  debtorId: number;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'loan_date' })
  loanDate: Date;
}
