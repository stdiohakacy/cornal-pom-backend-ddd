import { Provider } from '@nestjs/common';
import { GROUP_REPOSITORY_PORT } from './group/group.repository.interface';
import { GroupRepositoryImpl } from 'src/infrastructure/persistence/typeorm/repositories/group.repository.impl';
import { USER_REPOSITORY_PORT } from './group/user.repository.inteface';
import { UserRepositoryImpl } from 'src/infrastructure/persistence/typeorm/repositories/user.repository.impl';
import { AuditLogRepositoryImpl } from 'src/infrastructure/persistence/mongo/repositories/audit-log.repository.impl';
import { AUDIT_LOG_REPOSITORY_PORT } from './audit-log/audit-log.repository.interface';

export const repositoryPorts: Provider[] = [
  {
    provide: GROUP_REPOSITORY_PORT,
    useClass: GroupRepositoryImpl,
  },
  {
    provide: USER_REPOSITORY_PORT,
    useClass: UserRepositoryImpl,
  },
  {
    provide: AUDIT_LOG_REPOSITORY_PORT,
    useClass: AuditLogRepositoryImpl,
  },
];
