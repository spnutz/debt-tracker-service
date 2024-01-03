import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '../exceptions/base.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let code = 'INTERNAL_SERVER_ERROR';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong!';
    if (exception instanceof BaseException) {
      code = exception.error_code;
      status = exception.error_status;
      message = exception.error_message;
    } else if (exception instanceof UnauthorizedException) {
      code = 'UNAUTHORIZED';
      status = HttpStatus.UNAUTHORIZED;
      message = 'Unauthorized';
    }
    response.status(status).json({
      error_code: code,
      error_message: message,
    });
  }
}
