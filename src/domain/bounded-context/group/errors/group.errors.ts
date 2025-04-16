import { Result } from '@shared/domain/patterns/result.pattern';
import { UseCaseError } from '@shared/errors/use-case.error';

export namespace GroupErrors {
  export class CreatorNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `Creator with id ${id} not found`,
      } as UseCaseError);
    }
  }

  export class InvalidGroupError extends Result<UseCaseError> {
    constructor(message: string) {
      super(false, {
        message,
      } as UseCaseError);
    }
  }

  export class InvalidGroupMemberError extends Result<UseCaseError> {
    constructor(message: string) {
      super(false, {
        message,
      } as UseCaseError);
    }
  }
}
