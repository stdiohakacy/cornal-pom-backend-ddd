import { Provider } from '@nestjs/common';
import { AUDIT_LOG_PORT } from '../audit-log/audit-log.interface';
import { AuditLogMongoAdapter } from 'src/infrastructure/adapters/audit-log/audit-log.mongo.adapter';

export const eventPorts: Provider[] = [
  // {
  //   provide: AUDIT_LOG_PORT,
  //   useClass: AuditLogConsoleAdapter,
  // },
  {
    provide: AUDIT_LOG_PORT,
    useClass: AuditLogMongoAdapter,
  },
];
