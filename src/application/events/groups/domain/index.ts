import { GroupDomainEventHandler } from './handlers/group.domain.event.handler';
import { OnGroupCreatedHandler } from './handlers/on-group.created.domain.event.handler';

export const groupEventHandlers = [
  OnGroupCreatedHandler,
  GroupDomainEventHandler,
];
