import { BaseApplicationEvent } from '@shared/application/base.application.event';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';

export class GroupCreatedApplicationEvent extends BaseApplicationEvent<{
  groupId: BaseUniqueEntityId;
  creatorId: BaseUniqueEntityId;
  name: string;
}> {
  constructor(
    groupId: BaseUniqueEntityId,
    creatorId: BaseUniqueEntityId,
    name: string,
  ) {
    super({ groupId, creatorId, name });
  }
  getName(): string {
    return this.constructor.name;
  }
}
