import { BaseDomainEventInterface } from '@shared/domain/events/domain.event.interface';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';

export class GroupCreatedDomainEvent implements BaseDomainEventInterface {
  public readonly dateTimeOccurred: Date;
  public readonly eventId: string;

  constructor(
    private readonly groupId: BaseUniqueEntityId,
    public readonly creatorId: BaseUniqueEntityId,
    public readonly groupName: string,
  ) {
    this.dateTimeOccurred = new Date();
    this.eventId = crypto.randomUUID();
  }

  getAggregateRootId(): BaseUniqueEntityId {
    return this.groupId;
  }

  toJSON(): Record<string, unknown> {
    return {
      groupId: this.groupId.toString(),
      creatorId: this.creatorId.toString(),
      groupName: this.groupName,
      occurredAt: this.dateTimeOccurred.toISOString(),
      eventId: this.eventId,
    };
  }
}
