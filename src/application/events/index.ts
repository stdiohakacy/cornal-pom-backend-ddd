import { Provider } from '@nestjs/common';
import { AUDIT_LOG_PORT } from '../ports/audit-log/audit-log.interface';
import { AuditLogMongoAdapter } from 'src/infrastructure/adapters/audit-log/audit-log.mongo.adapter';
import { EVENT_STORE_PUBLISHER_PORT } from '../ports/messages/event-store.publisher.interface';
import { EventStoreDBPublisher } from 'src/infrastructure/persistence/event-store/event-store.publisher';

export const eventPorts: Provider[] = [
  {
    provide: AUDIT_LOG_PORT,
    useClass: AuditLogMongoAdapter,
  },
  {
    provide: EVENT_STORE_PUBLISHER_PORT,
    useClass: EventStoreDBPublisher,
  },
];
