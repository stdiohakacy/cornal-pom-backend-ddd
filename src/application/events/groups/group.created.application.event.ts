import { ApplicationEvent } from '@shared/application/application.event';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';

export class GroupCreatedApplicationEvent extends ApplicationEvent {
  constructor(
    public readonly payload: {
      groupId: BaseUniqueEntityId;
      creatorId: BaseUniqueEntityId;
      name: string;
    },
    public readonly timestamp: Date,
  ) {
    super('GroupCreated', 'group.created', 1, payload);
  }

  getName(): string {
    return this.eventName;
  }
}
