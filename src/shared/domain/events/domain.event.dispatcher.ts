import { BaseAggregateRoot } from '../aggregates/base.aggregate-root';
import { BaseUniqueEntityId } from '../identifier/base.unique-entity.id';
import { BaseDomainEventInterface } from './domain.event.interface';
import { EventStorePublisherInterface } from 'src/application/ports/messages/event-store.publisher.interface';

export class BaseDomainEventDispatcher {
  private readonly handlersMap: Map<
    string,
    Array<(event: BaseDomainEventInterface) => void>
  > = new Map();
  private readonly markedAggregates: Map<string, BaseAggregateRoot<unknown>> =
    new Map();

  public markAggregateForDispatch<T>(aggregate: BaseAggregateRoot<T>): void {
    const id = aggregate.id.toString();
    if (!this.markedAggregates.has(id)) {
      this.markedAggregates.set(id, aggregate as BaseAggregateRoot<T>);
    }
  }

  public async dispatchEventsForAggregate(
    id: BaseUniqueEntityId,
  ): Promise<void> {
    const aggregate = this.markedAggregates.get(id.toString());
    if (!aggregate) return;

    await this.dispatchAggregateEvents(aggregate);
    aggregate.clearEvents();
    this.markedAggregates.delete(id.toString());
  }

  public async dispatchEventsWithPersistence(
    id: BaseUniqueEntityId,
    publisher: EventStorePublisherInterface,
  ): Promise<void> {
    const aggregate = this.markedAggregates.get(id.toString());
    if (!aggregate) return;

    await publisher.publish(aggregate.domainEvents);
    await this.dispatchAggregateEvents(aggregate);
    aggregate.clearEvents();
    this.markedAggregates.delete(id.toString());
  }

  public register<T extends BaseDomainEventInterface>(
    eventClass: new (...args: any[]) => T,
    handler: (event: T) => void,
  ): void {
    const eventName = eventClass.name;
    if (!this.handlersMap.has(eventName)) {
      this.handlersMap.set(eventName, []);
    }

    this.handlersMap
      .get(eventName)!
      .push(handler as (event: BaseDomainEventInterface) => void);
  }

  private async dispatchAggregateEvents<T>(
    aggregate: BaseAggregateRoot<T>,
  ): Promise<void> {
    for (const event of aggregate.domainEvents) {
      await this.dispatch(event);
    }
  }

  private async dispatch(event: BaseDomainEventInterface): Promise<void> {
    const eventName = event.constructor.name;
    const handlers = this.handlersMap.get(eventName) ?? [];

    if (handlers.length === 0) {
      console.warn(
        `[DomainEventDispatcher] No handlers registered for event: ${eventName}`,
      );
      return;
    }

    await Promise.all(handlers.map((handler) => handler(event)));
  }
}
