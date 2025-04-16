import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/base.entity';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { Guard } from '@shared/domain/patterns/guard.pattern';
import { Result } from '@shared/domain/patterns/result.pattern';

export interface UserProps extends BaseEntityProps {
  name: string;
  email: string;
}

export class User extends BaseEntity<UserProps> {
  private constructor(props: UserProps, id?: BaseUniqueEntityId) {
    super(props, id);
  }

  public static create(
    props: UserProps,
    id?: BaseUniqueEntityId,
  ): Result<User> {
    const guardResult = Guard.combine([
      Guard.againstNullOrUndefinedOrEmpty(props.name, 'name'),
      Guard.againstNullOrUndefinedOrEmpty(props.email, 'email'),
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue());
    }
    if (!props.email.includes('@')) {
      return Result.fail<User>('Invalid email format');
    }
    return Result.ok(new User(props, id));
  }

  get id(): BaseUniqueEntityId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  updateEmail(email: string): void {
    this.props.email = email;
    this.props.updatedAt = new Date();
  }
}
