import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = new ConfigService();

export const dataSourceOption: DataSourceOptions = {
  synchronize: false,
  type: 'postgres',
  //   host: config.get<string>('pg.host'),
  //   port: config.get<number>('pg.port'),
  //   username: config.get<string>('pg.user'),
  //   password: config.get<string>('pg.password'),
  //   database: config.get<string>('pg.name'),
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'auth-service',
  port: 5432,
  extra: {
    connectionLimit: 30,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/shared/typeorm/migrations/*{.ts,.js}'],
  maxQueryExecutionTime: 2500,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
