import { Provider } from '@nestjs/common';
import { GROUP_REPOSITORY_PORT } from './group/group.repository.interface';
import { GroupRepositoryImpl } from 'src/infrastructure/persistence/typeorm/repositories/group.repository.impl';
import { USER_REPOSITORY_PORT } from './group/user.repository.inteface';

export const repositoryPorts: Provider[] = [
  {
    provide: GROUP_REPOSITORY_PORT,
    useClass: GroupRepositoryImpl,
  },
  {
    provide: USER_REPOSITORY_PORT,
    useClass: GroupRepositoryImpl,
  },
];
