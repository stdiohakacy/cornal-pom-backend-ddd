import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { GroupCreatedDomainEvent } from 'src/domain/bounded-context/group/events/group.created.event';
import { GroupCreatedApplicationEvent } from '../../app';
import { GroupCreatedIntegrationEvent } from '../../integration/group.created.integration.event';

@EventsHandler(GroupCreatedDomainEvent)
export class OnGroupCreatedHandler
  implements IEventHandler<GroupCreatedDomainEvent>
{
  constructor(private readonly eventBus: EventBus) {}

  handle(event: GroupCreatedDomainEvent): void {
    console.log(`[Handler] GroupCreatedDomainEvent received`);

    const appEvent = new GroupCreatedApplicationEvent(
      {
        groupId: event.getAggregateRootId(),
        creatorId: event.creatorId,
        name: event.groupName,
      },
      event.dateTimeOccurred,
    );

    const integrationEvent = new GroupCreatedIntegrationEvent(
      event.getAggregateRootId().toString(),
      event.groupName,
      event.dateTimeOccurred,
    );

    this.eventBus.publishAll([appEvent, integrationEvent]);
  }
}
