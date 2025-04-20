import { BaseDomainEventInterface } from '../events/domain.event.interface';
import { BaseUniqueEntityId } from '../identifier/base.unique-entity.id';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseAggregateRoot<T> extends BaseEntity<T> {
  private _domainEvents: BaseDomainEventInterface[] = [];

  get id(): BaseUniqueEntityId {
    return this._id;
  }

  get domainEvents(): ReadonlyArray<BaseDomainEventInterface> {
    return this._domainEvents;
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  protected addDomainEvent(domainEvent: BaseDomainEventInterface): void {
    const eventExisted = this._domainEvents.some(
      (event) => event.constructor.name === domainEvent.constructor.name,
    );

    if (!eventExisted) {
      this._domainEvents.push(domainEvent);
      this.logDomainEventAdded(domainEvent);
    }
  }

  private logDomainEventAdded(domainEvent: BaseDomainEventInterface): void {
    const thisClassName = this.constructor.name;
    const eventClassName = domainEvent.constructor.name;
    console.info(
      `[Domain Event Created]: ${thisClassName} => ${eventClassName}`,
    );
  }
}
