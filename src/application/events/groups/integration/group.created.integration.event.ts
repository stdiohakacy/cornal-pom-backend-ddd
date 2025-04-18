import { BaseIntegrationEvent } from '@shared/events/base.event';

export class GroupCreatedIntegrationEvent extends BaseIntegrationEvent {
  constructor(
    public readonly groupId: string,
    public readonly groupName: string,
    public readonly createdAt: Date,
  ) {
    super();
  }

  topic(): string {
    return 'group.created';
  }

  toJSON(): Record<string, unknown> {
    return {
      groupId: this.groupId,
      groupName: this.groupName,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
