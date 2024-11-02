import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Network } from './network.entity';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Network]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('cache.ttl'),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NetworkService],
  controllers: [NetworkController],
})
export class NetworkModule {}
