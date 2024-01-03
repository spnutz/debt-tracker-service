import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UsersModule {}
