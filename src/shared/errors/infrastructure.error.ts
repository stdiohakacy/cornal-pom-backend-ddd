import { Result } from '@shared/domain/patterns/result.pattern';

export abstract class InfrastructureError extends Error {
  constructor(
    readonly message: string,
    readonly originalError?: unknown,
    readonly context?: string,
  ) {
    super(message);
    this.name = new.target.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class RepositoryError extends InfrastructureError {
  constructor(message: string, originalError?: unknown, context?: string) {
    super(message, originalError, context);
  }

  static toResult(error: RepositoryError): Result<RepositoryError> {
    return Result.fail(error.message);
  }
}
