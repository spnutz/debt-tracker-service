import { Module } from '@nestjs/common';
import { DebtController } from './debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debtors, Debts } from 'src/common/entities';
import { DebtorsService, DebtsService } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([Debtors, Debts])],
  controllers: [DebtController],
  providers: [DebtorsService, DebtsService],
})
export class DebtModule {}
