import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Debtors } from 'src/common/entities';
import { Repository } from 'typeorm';
import { CreateDebtorBodyDto, ListDeptorsResponseDto } from './dto/debt.dto';
import { ICurrentUser } from 'src/common/interfaces/user.interface';
import { DataAlreadyExistsException } from 'src/common/exceptions/data-already-exists.exception';

@Injectable()
export class DebtorsService {
  constructor(
    @InjectRepository(Debtors)
    private debtorsRepository: Repository<Debtors>,
  ) {}

  async createDebtor(
    user: ICurrentUser,
    body: CreateDebtorBodyDto,
  ): Promise<void> {
    const { name } = body;
    const debtor = await this.debtorsRepository.findOne({ where: { name } });
    if (debtor) {
      throw new DataAlreadyExistsException(
        'This debtor already exists.',
        'DEBTOR_ALREADY_EXISTS',
      );
    }
    await this.debtorsRepository.insert({ name, createdBy: user.userId });
  }

  async listDebtors(user: ICurrentUser): Promise<ListDeptorsResponseDto[]> {
    return this.debtorsRepository.find({ where: { createdBy: user.userId } });
  }
}
