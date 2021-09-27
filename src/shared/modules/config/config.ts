import { config as configEnv } from 'dotenv';

export interface IConfig {
  nodeEnv: string;
  server: {
    port: number;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    dbName: string;
  };
}

const nodeEnv = process.env.NODE_ENV;

configEnv({ path: nodeEnv === 'production' ? '.env' : '.env.dev' });

export function config(): IConfig {
  return {
    nodeEnv,
    server: {
      port: Number(process.env.PORT),
    },
    database: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      dbName: process.env.DB_DATABASE,
    },
  };
}
