import { Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcResponseInterceptor } from './interceptors/grpc/grpc.response.interceptor';
import { GrpcExceptionFilter } from './filters/grpc/grpc.exception.filter';

const INTERCEPTORS: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: GrpcResponseInterceptor,
  },
];

const FILTERS: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: GrpcExceptionFilter,
  },
];

@Module({
  providers: [...INTERCEPTORS, ...FILTERS],
})
export class AppMiddlewareModule {}
