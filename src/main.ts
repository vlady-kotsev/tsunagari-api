import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SeederService } from './seeder/seeder.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthInterceptor } from './app.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['log', 'fatal', 'error', 'warn', 'debug'],
    });

    const configService = app.get(ConfigService);

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Bridge API')
      .setDescription(
        'Bridge API endpoints for getting tokens, networks and transactions',
      )
      .setVersion('1.0')
      .build();
    const documentFactory = () =>
      SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, documentFactory);

    const grpcHost =
      configService.get('app.grpcHost') ?? 'host.docker.internal';
    const grpcPort = configService.get('app.grpcPort') ?? 5000;

    const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.GRPC,
        logger: ['log', 'fatal', 'error', 'warn', 'debug'],
        options: {
          package: 'transactions',
          protoPath: join(__dirname, configService.get('app.protoPath')),
          url: `${grpcHost}:${grpcPort}`,
        },
      },
    );

    if (configService.get('db.seed')) {
      const seederService = app.get(SeederService);
      await seederService.seed();
    }

    const appHost = configService.get('app.host') ?? 'host.docker.internal';
    const appPort = configService.get('app.port') ?? 3000;
    await app.listen(appPort, appHost);
    Logger.log(`HTTP server running on port ${appHost}:${appPort}`);

    const authInterceptor = grpcApp.get(AuthInterceptor);
    grpcApp.useGlobalInterceptors(authInterceptor);

    await grpcApp.listen();
    Logger.log(`gRPC server running on port ${grpcHost}:${grpcPort}`);
  } catch (error) {
    Logger.error(error);
  }
}
bootstrap();
