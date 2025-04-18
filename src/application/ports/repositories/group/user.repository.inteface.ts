import { RepositoryInterface } from '@shared/application/repository.interface';
import { User } from 'src/domain/bounded-context/group/entities/user.entity';

export const USER_REPOSITORY_PORT = Symbol('USER_REPOSITORY_PORT');
export interface UserRepositoryInterface extends RepositoryInterface<User> {}
