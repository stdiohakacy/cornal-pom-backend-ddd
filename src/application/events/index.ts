import { Provider } from '@nestjs/common';
import { AUDIT_LOG_PORT } from '../audit-log/audit-log.interface';
import { AuditLogMongoAdapter } from 'src/infrastructure/adapters/audit-log/audit-log.mongo.adapter';
import { EVENT_PUBLISHER_PORT } from '../../shared/application/event.publisher.interface';
import { KafkaPublisherAdapter } from 'src/infrastructure/messages/kafka/kafka.publisher.adapter';

export const eventPorts: Provider[] = [
  {
    provide: AUDIT_LOG_PORT,
    useClass: AuditLogMongoAdapter,
  },
  {
    provide: EVENT_PUBLISHER_PORT,
    useClass: KafkaPublisherAdapter,
  },
];
