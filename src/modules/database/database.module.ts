import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'src/shared/typeorm/typeorm.config';
// import { TypeOrmConfigService } from 'src/shared/typeorm/typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useClass: MongooseConfigService,
    // }),
  ],
})
export class DatabaseModule {}
