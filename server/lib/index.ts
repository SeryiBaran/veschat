import { DataSource } from 'typeorm';
import { Message } from '../entities';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Message],
  migrations: [],
  subscribers: [],
});
