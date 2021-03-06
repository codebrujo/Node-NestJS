import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from 'modules/config';
import { AuthModule } from 'modules/auth';
import { CommonModule } from 'modules/common';
import { StocksModule } from '../stock/stock.module';
import { LoggerModule } from 'modules/logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AxiosRequestInterceptor } from './axios-request.interceptor';
import { ASYNC_STORAGE } from 'modules/logger/constants';
import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.get('DB_SYNC') === 'true',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    AuthModule,
    CommonModule,
    StocksModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: ASYNC_STORAGE,
      useValue: asyncLocalStorage
    },
  ],
})
export class AppModule {}
