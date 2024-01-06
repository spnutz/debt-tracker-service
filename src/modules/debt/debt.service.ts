import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Debtors, Debts } from 'src/common/entities';
import { ICurrentUser } from 'src/common/interfaces/user.interface';
import { Repository } from 'typeorm';
import { CreateDebtBodyDto, GetDebtorDetailResponseDto } from './dto/debt.dto';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debts)
    private debtsRepository: Repository<Debts>,
    @InjectRepository(Debtors)
    private debtorsRepository: Repository<Debtors>,
  ) {}

  async createDebt(user: ICurrentUser, body: CreateDebtBodyDto): Promise<void> {
    const { debtorId, amount, description, loanDate } = body;
    await this.debtsRepository.insert({
      debtorId,
      amount,
      description,
      loanDate: new Date(loanDate),
      createdBy: user.userId,
    });
  }

  async getDebtsByDebtorsId(
    user: ICurrentUser,
    debtorId: number,
  ): Promise<GetDebtorDetailResponseDto> {
    const debtor = await this.debtorsRepository.findOne({
      where: {
        debtorId,
        createdBy: user.userId,
      },
    });
    const debts = await this.debtsRepository.find({
      where: {
        debtorId,
        createdBy: user.userId,
      },
    });
    const countDebt = debts.reduce((acc, debt) => {
      return acc + debt.amount;
    }, 0);
    return {
      debtor: debtor.name,
      total: countDebt,
      items: debts,
    };
  }
}
