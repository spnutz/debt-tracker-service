import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateDebtorBodyDto {
  @ApiProperty({
    description: 'The name of the debtor',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateDebtBodyDto {
  @ApiProperty({
    description: 'The description of the debt',
    example: 'Food',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The amount of the debt',
    example: 10,
  })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'The debtor id of the debt',
    example: 1,
  })
  @IsNotEmpty()
  debtorId: number;

  @ApiProperty({
    description: 'The loan date of the debt',
    example: '2020-01-01',
  })
  @IsNotEmpty()
  @IsDateString()
  loanDate: string;
}
