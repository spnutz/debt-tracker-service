import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { TypeORMError } from 'typeorm';

export class DataAlreadyExistsException extends BaseException {
  constructor(
    message: string,
    errCode: string,
    error?: Error | TypeORMError | HttpException,
  ) {
    super(error, `${message}`, `${errCode}`, HttpStatus.BAD_REQUEST);
  }
}
