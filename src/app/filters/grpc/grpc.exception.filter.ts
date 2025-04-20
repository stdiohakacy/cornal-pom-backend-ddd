import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { Metadata, ServiceError, status } from '@grpc/grpc-js';

@Catch(RpcException)
export class GrpcExceptionFilter extends BaseRpcExceptionFilter<RpcException> {
  private readonly logger = new Logger(GrpcExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost): Observable<never> {
    const { code, message } = this.parseGrpcException(exception);
    const metadata = this.createMetadata();

    this.logger.error(`[gRPC ${code}] ${message}`, {
      context: GrpcExceptionFilter.name,
      raw: exception.getError?.(),
    });

    const grpcError: ServiceError = {
      name: 'GrpcError',
      message,
      code,
      metadata,
      details: message,
    };

    return throwError(() => grpcError);
  }

  private parseGrpcException(exception: RpcException): {
    code: number;
    message: string;
  } {
    const response = exception.getError();

    const message =
      typeof response === 'string'
        ? response
        : typeof response === 'object' &&
            response !== null &&
            'message' in response
          ? String(response.message)
          : 'Unexpected gRPC error';

    const grpcStatus =
      typeof response === 'object' &&
      response !== null &&
      'code' in response &&
      typeof response.code === 'number'
        ? response.code
        : status.INTERNAL;

    return { code: grpcStatus, message };
  }

  private createMetadata(): Metadata {
    const metadata = new Metadata();
    metadata.set('timestamp', new Date().toISOString());
    metadata.set('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    return metadata;
  }
}
