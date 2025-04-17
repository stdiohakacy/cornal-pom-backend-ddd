import { BaseEvent } from '@shared/events/base.event';
import { BaseUniqueEntityId } from '../identifier/base.unique-entity.id';

export interface BaseDomainEventInterface extends BaseEvent {
  getAggregateRootId(): BaseUniqueEntityId;
}
