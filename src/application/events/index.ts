import { Provider } from '@nestjs/common';
import { AUDIT_LOG_PORT } from '../audit-log/audit-log.interface';
import { ConsoleAuditLogAdapter } from 'src/infrastructure/adapters/logger/audit-log.adapter';

export const eventPorts: Provider[] = [
  {
    provide: AUDIT_LOG_PORT,
    useClass: ConsoleAuditLogAdapter,
  },
];
