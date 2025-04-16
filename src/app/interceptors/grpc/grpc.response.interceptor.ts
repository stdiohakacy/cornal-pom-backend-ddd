import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Result } from '@shared/domain/patterns/result.pattern';
import { status as GrpcStatus } from '@grpc/grpc-js';

@Injectable()
export class GrpcResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        if (result instanceof Result) {
          if (result.isFailure) {
            throw new RpcException({
              code: this.mapErrorToStatus(result.getErrorValue()),
              message: result.getErrorValue()?.toString() ?? 'Operation failed',
            });
          } else if (result.isSuccess) {
            return {
              id: result.getValue(),
              response: {
                code: 201,
                message: 'Success',
                timestamp: new Date().toISOString(),
              },
            };
          }
        }
      }),
      catchError((err) => {
        if (err instanceof RpcException) return throwError(() => err);

        return throwError(
          () =>
            new RpcException({
              code: GrpcStatus.UNKNOWN,
              message: err.message || 'Unexpected internal error',
            }),
        );
      }),
    );
  }

  private mapErrorToStatus(error: any): number {
    const message = typeof error === 'string' ? error.toLowerCase() : '';

    if (message.includes('not found')) return GrpcStatus.NOT_FOUND;
    if (message.includes('already exists')) return GrpcStatus.ALREADY_EXISTS;
    if (message.includes('unauthorized')) return GrpcStatus.UNAUTHENTICATED;
    if (message.includes('forbidden')) return GrpcStatus.PERMISSION_DENIED;
    if (message.includes('timeout')) return GrpcStatus.DEADLINE_EXCEEDED;

    return GrpcStatus.INVALID_ARGUMENT;
  }
}
