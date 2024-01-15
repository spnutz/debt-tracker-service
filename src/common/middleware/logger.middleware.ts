import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method, ip } = req;
    const startTime = process.hrtime();
    res.on('close', () => {
      const diff = process.hrtime(startTime);
      const responseTime = Math.round(diff[0] * 1e3 + diff[1] * 1e-6);
      this.logger.log(`[${method}] ${originalUrl} ${responseTime}ms - ${ip}`);
    });

    next();
  }
}
