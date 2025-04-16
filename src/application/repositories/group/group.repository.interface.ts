import { RepositoryInterface } from '@shared/application/repository.interface';
import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';

export const GROUP_REPOSITORY_PORT = Symbol('GROUP_REPOSITORY_PORT');
export interface GroupRepositoryInterface extends RepositoryInterface<Group> {}
