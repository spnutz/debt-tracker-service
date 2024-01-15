import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './modules/health/health.controller';
import { HealthModule } from './modules/health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { mongo, pg } from './config/database.config';
import { DebtModule } from './modules/debt/debt.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongo, pg],
      isGlobal: true,
    }),
    TerminusModule,
    HealthModule,
    HttpModule,
    AuthModule,
    DatabaseModule,
    DebtModule,
  ],
  providers: [Logger],
  controllers: [HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
