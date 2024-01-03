import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

export class BaseException extends HttpException {
  error_message: string;
  error_code: string;
  error_status: HttpStatus;
  constructor(
    error?: Error | TypeORMError | HttpException,
    error_message?: string,
    error_code?: string,
    error_status?: HttpStatus,
  ) {
    super(
      error_message || 'Something went wrong!',
      error_status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.error_status = error_status || HttpStatus.INTERNAL_SERVER_ERROR;
    this.error_code = error_code || 'INTERNAL_SERVER_ERROR';
    this.error_message = error_message || 'Something went wrong!';
  }
}
