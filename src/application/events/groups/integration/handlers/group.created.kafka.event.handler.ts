import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GroupCreatedKafkaEvent } from '../group.created.kafka.event';
import {
  KAFKA_PUBLISHER_PORT,
  KafkaPublisherInterface,
} from 'src/application/ports/messaging/kafka/kafka.publisher.interface';

@EventsHandler(GroupCreatedKafkaEvent)
export class GroupCreatedKafkaHandler
  implements IEventHandler<GroupCreatedKafkaEvent>
{
  constructor(
    @Inject(KAFKA_PUBLISHER_PORT)
    private readonly kafkaPublisher: KafkaPublisherInterface,
  ) {}

  async handle(event: GroupCreatedKafkaEvent): Promise<void> {
    await this.kafkaPublisher.publish('group.created', event.toJSON());
  }
}
