import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { GroupCreatedApplicationEvent } from '../group.created.application.event';
import { Inject } from '@nestjs/common';
import {
  AUDIT_LOG_PORT,
  AuditLogInterface,
} from 'src/application/audit-log/audit-log.interface';

@EventsHandler(GroupCreatedApplicationEvent)
export class GroupCreatedApplicationEventHandler
  implements IEventHandler<GroupCreatedApplicationEvent>
{
  constructor(
    @Inject(AUDIT_LOG_PORT)
    private readonly auditLogPort: AuditLogInterface,
  ) {}
  async handle(event: GroupCreatedApplicationEvent): Promise<void> {
    await this.auditLogPort.log(event.getName(), {
      groupId: event.payload.groupId.toString(),
      creatorId: event.payload.creatorId.toString(),
      name: event.payload.name,
      timestamp: event.timestamp.toISOString(),
    });
  }
}
