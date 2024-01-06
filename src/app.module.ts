import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './modules/health/health.controller';
import { HealthModule } from './modules/health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { mongo, pg } from './config/database.config';
import { DebtModule } from './modules/debt/debt.module';

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
  providers: [],
  controllers: [HealthController],
})
export class AppModule {}
