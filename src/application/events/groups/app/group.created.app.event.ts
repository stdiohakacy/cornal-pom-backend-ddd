import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { BaseApplicationEvent } from '@shared/events/base.event';

export class GroupCreatedApplicationEvent extends BaseApplicationEvent {
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
