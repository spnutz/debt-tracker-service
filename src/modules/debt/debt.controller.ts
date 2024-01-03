import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateDebtBodyDto, CreateDebtorBodyDto } from './dto/debt.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { UserInterceptor } from 'src/common/interceptors/user.interceptor';
import { User } from 'src/common/decoretors/user.decoretor';
import { ICurrentUser } from 'src/common/interfaces/user.interface';
import { DebtsService, DebtorsService } from '.';

@Controller('api/v1')
export class DebtController {
  constructor(
    private readonly debtorsService: DebtorsService,
    private readonly debtsService: DebtsService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(UserInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('debtors')
  async createDebtor(
    @User() user: ICurrentUser,
    @Body() body: CreateDebtorBodyDto,
  ): Promise<void> {
    return this.debtorsService.createDebtor(user, body);
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(UserInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('debtors')
  async listDebtors(@User() user: ICurrentUser) {
    return this.debtorsService.listDebtors(user);
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(UserInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('debts')
  async createDebt(
    @User() user: ICurrentUser,
    @Body() body: CreateDebtBodyDto,
  ): Promise<void> {
    return this.debtsService.createDebt(user, body);
  }
}
