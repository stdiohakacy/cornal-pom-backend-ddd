import { BaseDomainEventInterface } from '@shared/domain/events/domain.event.interface';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';

export class ServiceScopeCreatedEvent implements BaseDomainEventInterface {
  public readonly dateTimeOccurred: Date;

  constructor(public readonly orderId: BaseUniqueEntityId) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateRootId(): BaseUniqueEntityId {
    return this.orderId;
  }

  toJSON(): Record<string, unknown> {
    return {
      orderId: this.orderId.toString(),
      dateTimeOccurred: this.dateTimeOccurred.toISOString(),
    };
  }
}
