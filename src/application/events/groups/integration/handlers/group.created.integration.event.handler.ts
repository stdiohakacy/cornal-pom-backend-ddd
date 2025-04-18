import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GroupCreatedIntegrationEvent } from '../group.created.integration.event';
import {
  EventPublisherInterface,
  EVENT_PUBLISHER_PORT,
} from 'src/application/ports/messages/event.publisher.interface';

@EventsHandler(GroupCreatedIntegrationEvent)
export class GroupCreatedIntegrationEventHandler
  implements IEventHandler<GroupCreatedIntegrationEvent>
{
  constructor(
    @Inject(EVENT_PUBLISHER_PORT)
    private readonly eventPublisher: EventPublisherInterface,
  ) {}

  async handle(event: GroupCreatedIntegrationEvent): Promise<void> {
    await this.eventPublisher.publish('group.created', event.toJSON());
  }
}
