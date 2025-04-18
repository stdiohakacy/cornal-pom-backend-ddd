import { Inject, Injectable } from '@nestjs/common';
import { UseCaseInterface } from '@shared/application/use-case.interface';
import { GroupCreateDto } from 'src/application/dtos/group/group.create.dto';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import {
  GROUP_REPOSITORY_PORT,
  GroupRepositoryInterface,
} from 'src/application/ports/repositories/group/group.repository.interface';
import {
  Either,
  left,
  Result,
  right,
} from '@shared/domain/patterns/result.pattern';
import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';
import { RepositoryError } from '@shared/errors/infrastructure.error';
import { GroupMemberVO } from 'src/domain/bounded-context/group/value-objects/group-member.vo';
import {
  USER_REPOSITORY_PORT,
  UserRepositoryInterface,
} from 'src/application/ports/repositories/group/user.repository.inteface';
import { GroupErrors } from 'src/domain/bounded-context/group/errors/group.errors';
import { EventBus } from '@nestjs/cqrs';
import { GroupCreatedApplicationEvent } from 'src/application/events/groups/app/group.created.app.event';
import { GroupCreatedIntegrationEvent } from 'src/application/events/groups/integration/group.created.integration.event';
import { BaseDomainEvent } from '@shared/domain/events/domain.event';
import {
  EVENT_STORE_PUBLISHER_PORT,
  EventStorePublisherInterface,
} from 'src/application/ports/messages/event-store.publisher.interface';

export type GroupCreateResponse = Either<
  | GroupErrors.CreatorNotFoundError
  | GroupErrors.InvalidGroupMemberError
  | GroupErrors.InvalidGroupError
  | RepositoryError,
  Result<BaseUniqueEntityId>
>;

@Injectable()
export class CreateGroupUseCase
  implements UseCaseInterface<GroupCreateDto, GroupCreateResponse>
{
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryInterface,
    @Inject(GROUP_REPOSITORY_PORT)
    private readonly groupRepository: GroupRepositoryInterface,
    @Inject(EVENT_STORE_PUBLISHER_PORT)
    private readonly eventStorePublisher: EventStorePublisherInterface,
    private readonly eventBus: EventBus,
  ) {}

  async execute(dto: GroupCreateDto): Promise<GroupCreateResponse> {
    const { name, description, creatorId } = dto;

    const creatorUserId = new BaseUniqueEntityId(creatorId);
    const existOrError = await this.userRepository.exists(creatorUserId);

    if (existOrError.isLeft()) {
      return left(
        new RepositoryError(
          'Failed to check user',
          existOrError.value,
          'CreateGroupUseCase',
        ),
      );
    }

    if (!existOrError.value) {
      return left(
        new GroupErrors.CreatorNotFoundError(creatorUserId.toString()),
      );
    }

    const adminOrError = GroupMemberVO.createAdmin(creatorUserId);
    if (adminOrError.isFailure) {
      return left(
        new GroupErrors.InvalidGroupMemberError(
          adminOrError.getErrorValue().toString(),
        ),
      );
    }

    const groupOrError = Group.create(
      {
        name,
        description,
        members: [adminOrError.getValue()],
        creatorId: creatorUserId,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
      creatorUserId,
    );

    if (groupOrError.isFailure) {
      return left(
        new GroupErrors.InvalidGroupError(
          groupOrError.getErrorValue().toString(),
        ),
      );
    }

    const group = groupOrError.getValue();
    const saveOrError = await this.groupRepository.save(group);

    if (saveOrError.isLeft()) {
      return left(
        RepositoryError.toResult(
          new RepositoryError(
            'Failed to save group',
            saveOrError.value,
            'CreateGroupUseCase',
          ),
        ),
      );
    }

    this.eventBus.publishAll([
      new GroupCreatedApplicationEvent(
        { groupId: group.id, creatorId: group.creatorId, name: group.name },
        new Date(),
      ),
      new GroupCreatedIntegrationEvent(
        group.id.toString(),
        group.name,
        group.createdAt,
      ),
      BaseDomainEvent.dispatchEventsForAggregateWithPersistence(
        group.id,
        this.eventStorePublisher,
      ),
    ]);

    return right(Result.ok(group.id));
  }
}
