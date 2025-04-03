import { HttpException, HttpStatus } from '@nestjs/common';

export class RepositoryException extends HttpException {
  public readonly originalError?: unknown;
  public readonly context?: string;

  constructor(
    message: string,
    originalError?: unknown,
    context?: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(
      {
        statusCode: status,
        message,
        context,
        originalError: RepositoryException.serializeError(originalError),
      },
      status,
    );

    this.name = 'RepositoryException';
    this.context = context;
    this.originalError = originalError;

    Object.setPrototypeOf(this, RepositoryException.prototype);
  }

  static from(
    error: unknown,
    context?: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ): RepositoryException {
    let message = 'Unknown repository error';

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    return new RepositoryException(message, error, context, status);
  }

  static serializeError(error: unknown): any {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    return error;
  }

  toJSON(): Record<string, any> {
    return {
      statusCode: this.getStatus(),
      message: this.message,
      context: this.context,
      originalError: RepositoryException.serializeError(this.originalError),
    };
  }
}
