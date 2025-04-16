import { BaseBuilder } from '@shared/infrastructure/typeorm/repository/base.builder';
import { UserEntityOrm } from '../../../entities/user.entity-orm';
import { User } from 'src/domain/bounded-context/group/entities/user.entity';

export class UserToPersistenceBuilder extends BaseBuilder<User, UserEntityOrm> {
  private user: User;

  public fromDomain(user: User): this {
    this.user = user;
    return this;
  }

  public build(): UserEntityOrm {
    const userEntityOrm = new UserEntityOrm();

    userEntityOrm.name = this.user.name;
    userEntityOrm.email = this.user.email;

    return userEntityOrm;
  }
}
