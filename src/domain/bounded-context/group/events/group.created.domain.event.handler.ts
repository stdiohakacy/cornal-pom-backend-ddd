import { BaseDomainEvent } from '@shared/domain/events/domain.event';
import { GroupCreatedDomainEvent } from './group.created.event';

export class GroupDomainEventHandler {
  static registerAll() {
    BaseDomainEvent.register<GroupCreatedDomainEvent>(
      GroupDomainEventHandler.onGroupCreated,
      GroupCreatedDomainEvent.name,
    );
  }

  private static onGroupCreated(event: GroupCreatedDomainEvent) {
    console.log(
      `[DOMAIN] In-memory logic for group created: ${event.getAggregateRootId()}`,
    );
  }
}
