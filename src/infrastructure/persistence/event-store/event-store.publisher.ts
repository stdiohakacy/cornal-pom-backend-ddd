import { BaseDomainEventInterface } from '@shared/domain/events/domain.event.interface';
import { EventStorePublisherInterface } from 'src/application/ports/messages/event-store.publisher.interface';
import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { StreamName } from '@shared/utils/stream-name.util';

@Injectable()
export class EventStoreDBPublisher implements EventStorePublisherInterface {
  constructor(private readonly client: EventStoreDBClient) {}

  async publish(events: BaseDomainEventInterface[]): Promise<void> {
    for (const event of events) {
      const streamName = StreamName.forAggregate(
        event.constructor.name,
        event.getAggregateRootId().toString(),
      );

      const eventPayload = jsonEvent({
        type: event.constructor.name,
        data: event.toJSON(),
        metadata: {
          occurredAt: event.dateTimeOccurred.toISOString(),
          eventId: event.eventId,
        },
      });

      await this.client.appendToStream(streamName, [eventPayload]);
    }
  }
}
