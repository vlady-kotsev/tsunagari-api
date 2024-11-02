import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const metadata: Metadata = context.switchToRpc().getContext();
    const validPassowrd = this.configService.get('app.grpcPassword');
    if (!metadata) {
      return throwError(() => new RpcException('No metadata provided'));
    }

    const password = metadata.get('password');

    if (!password || !password.length) {
      return throwError(() => new RpcException('No password provided'));
    }

    if (password[0] !== validPassowrd) {
      return throwError(() => new RpcException('Invalid password'));
    }

    return next.handle();
  }
}
