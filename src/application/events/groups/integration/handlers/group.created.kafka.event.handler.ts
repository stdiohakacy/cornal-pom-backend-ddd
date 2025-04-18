import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GroupCreatedKafkaEvent } from '../group.created.kafka.event';
import {
  EventPublisherInterface,
  EVENT_PUBLISHER_PORT,
} from 'src/application/ports/messaging/kafka/kafka.publisher.interface';

@EventsHandler(GroupCreatedKafkaEvent)
export class GroupCreatedKafkaHandler
  implements IEventHandler<GroupCreatedKafkaEvent>
{
  constructor(
    @Inject(EVENT_PUBLISHER_PORT)
    private readonly eventPublisher: EventPublisherInterface,
  ) {}

  async handle(event: GroupCreatedKafkaEvent): Promise<void> {
    await this.eventPublisher.publish('group.created', event.toJSON());
  }
}
