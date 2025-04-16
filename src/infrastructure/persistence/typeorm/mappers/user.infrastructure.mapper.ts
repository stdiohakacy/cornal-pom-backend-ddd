import { User } from 'src/domain/bounded-context/group/entities/user.entity';
import { UserEntityOrm } from '../entities/user.entity-orm';
import { UserToDomainBuilder } from './builders/to-domain/user.to-domain.builder';
import { UserToPersistenceBuilder } from './builders/to-persistence/user.to-persistence.builder';

export class UserInfrastructureMapper {
  public static toDomain(userEntityOrm: UserEntityOrm): User {
    return new UserToDomainBuilder(userEntityOrm).build();
  }

  public static toPersistence(user: User): UserEntityOrm {
    return new UserToPersistenceBuilder().fromDomain(user).build();
  }
}
