import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { UserEntityOrm } from '../../../entities/user.entity-orm';
import { User } from 'src/domain/bounded-context/group/entities/user.entity';

export class UserToDomainBuilder {
  constructor(private readonly _user: UserEntityOrm) {}

  public build(): User {
    if (!this._user) {
      throw new Error(
        'ORM entity is not set for RouteLocationConversionBuilder',
      );
    }

    const result = User.create(
      {
        name: this._user.name,
        email: this._user.email,
      },
      new BaseUniqueEntityId(this._user.id),
    );

    if (result.isFailure) {
      throw new Error(
        `Invalid RouteLocationConversion from ORM: ${result.getErrorValue()}`,
      );
    }

    return result.getValue();
  }
}
