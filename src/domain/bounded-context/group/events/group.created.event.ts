import { BaseDomainEventInterface } from '@shared/domain/events/domain.event.interface';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';

export class GroupCreatedDomainEvent implements BaseDomainEventInterface {
  dateTimeOccurred: Date;

  constructor(
    private readonly groupId: BaseUniqueEntityId,
    private readonly creatorId: BaseUniqueEntityId,
  ) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateRootId(): BaseUniqueEntityId {
    return this.groupId;
  }

  toJSON(): Record<string, unknown> {
    return {
      groupId: this.groupId.toString(),
      creatorId: this.creatorId.toString(),
      dateTimeOccurred: this.dateTimeOccurred,
    };
  }
}
