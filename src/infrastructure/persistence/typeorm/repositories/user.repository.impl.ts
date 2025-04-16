import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/bounded-context/group/entities/user.entity';
import { UserEntityOrm } from '../entities/user.entity-orm';
import { Repository } from 'typeorm';
import { USER_SCHEMA } from '../schemas/user.schema';
import { UserInfrastructureMapper } from '../mappers/user.infrastructure.mapper';
import { BaseRepositoryImpl } from '@shared/infrastructure/typeorm/repository/repository.impl';
import { UserRepositoryInterface } from 'src/application/repositories/group/user.repository.inteface';

export class UserRepositoryImpl
  extends BaseRepositoryImpl<User, UserEntityOrm>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserEntityOrm)
    readonly userRepository: Repository<UserEntityOrm>,
  ) {
    super(userRepository, USER_SCHEMA, UserInfrastructureMapper);
  }
}
