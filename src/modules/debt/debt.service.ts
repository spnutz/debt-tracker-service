import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Debts } from 'src/common/entities';
import { ICurrentUser } from 'src/common/interfaces/user.interface';
import { Repository } from 'typeorm';
import { CreateDebtBodyDto } from './dto/debt.dto';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debts)
    private debtsRepository: Repository<Debts>,
  ) {}

  async createDebt(user: ICurrentUser, body: CreateDebtBodyDto): Promise<void> {
    const { debtorId, amount, description, loanDate } = body;
    try {
      await this.debtsRepository.insert({
        debtorId,
        amount,
        description,
        loanDate: new Date(loanDate),
        createdBy: user.userId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
