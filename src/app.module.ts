import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transactions.module';
import { TokenModule } from './token/token.module';
import { NetworkModule } from './network/network.module';
import { SeederModule } from './seeder/seeder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../db/data-source';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config.json';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TransactionModule,
    TokenModule,
    NetworkModule,
    SeederModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [() => config],
    }),
  ],
})
export class AppModule {}
