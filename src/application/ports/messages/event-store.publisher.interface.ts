import { BaseDomainEventInterface } from '@shared/domain/events/domain.event.interface';

export const EVENT_STORE_PUBLISHER_PORT = Symbol('EVENT_STORE_PUBLISHER_PORT');
export interface EventStorePublisherInterface {
  publish(events: ReadonlyArray<BaseDomainEventInterface>): Promise<void>;
}
