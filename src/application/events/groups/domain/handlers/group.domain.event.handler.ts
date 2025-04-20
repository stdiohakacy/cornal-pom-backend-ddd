import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseDomainEventDispatcher } from '@shared/domain/events/domain.event.dispatcher';
import { GroupCreatedDomainEvent } from 'src/domain/bounded-context/group/events/group.created.event';

@Injectable()
export class GroupDomainEventHandler implements OnModuleInit {
  constructor(
    private readonly dispatcher: BaseDomainEventDispatcher,
    private readonly eventBus: EventBus,
  ) {}

  onModuleInit(): void {
    this.dispatcher.register(
      GroupCreatedDomainEvent,
      this.onGroupCreated.bind(this),
    );
  }

  private onGroupCreated(event: GroupCreatedDomainEvent): void {
    console.log(
      `[DOMAIN HANDLER] Group created: ${event.getAggregateRootId().toString()}`,
    );

    this.eventBus.publish(event);
  }
}
