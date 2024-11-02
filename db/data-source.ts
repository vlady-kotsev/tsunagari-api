import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Network } from 'src/network/network.entity';
import { Token } from 'src/token/token.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function retryConnection(
  configService: ConfigService,
  attempt = 1,
): Promise<TypeOrmModuleOptions> {
  try {
    const config: PostgresConnectionOptions = {
      type: 'postgres',
      host: configService.get('db.host'),
      port: configService.get('db.port'),
      username: configService.get('db.username'),
      password: configService.get('db.password'),
      database: configService.get('db.database'),
      entities: [Transaction, Token, Network],
      synchronize: true,
      migrations: ['dist/db/migrations/*.js'],
    };

    const { Client } = require('pg');
    const client = new Client({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    await client.connect();
    await client.end();

    Logger.log('Successfully connected to database');
    return config;
  } catch (error) {
    if (attempt === configService.get('db.maxAttempts')) {
      Logger.error(
        `Failed to connect to database after ${configService.get('db.maxAttempts')} attempts`,
      );
      throw error;
    }

    const delay =
      configService.get('db.initialDelay') * Math.pow(2, attempt - 1);
    Logger.warn(
      `Failed to connect to database. Retrying in ${delay}ms... (Attempt ${attempt}/${configService.get('db.maxAttempts')})`,
    );

    await sleep(delay);
    return retryConnection(configService, attempt + 1);
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => retryConnection(configService),
};
