import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOption: DataSourceOptions = {
  synchronize: false,
  type: 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  extra: {
    connectionLimit: 30,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/shared/typeorm/migrations/*{.ts,.js}'],
  maxQueryExecutionTime: 2500,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
