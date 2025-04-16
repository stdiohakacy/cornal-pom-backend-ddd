import { BaseAggregateRoot } from '@shared/domain/aggregates/base.aggregate-root';
import { BaseEntityProps } from '@shared/domain/entities/base.entity';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { Result } from '@shared/domain/patterns/result.pattern';
import { Guard } from '@shared/domain/patterns/guard.pattern';
import { GroupMemberVO } from '../value-objects/group-member.vo';
import { GroupCreatedDomainEvent } from '../events/group.created.event';

export interface GroupProps extends BaseEntityProps {
  name: string;
  description?: string;
  creatorId: BaseUniqueEntityId;
  members?: GroupMemberVO[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export class Group extends BaseAggregateRoot<GroupProps> {
  private constructor(props: GroupProps, id?: BaseUniqueEntityId) {
    super(props, id);
  }

  public static create(
    props: GroupProps,
    adminUserId: BaseUniqueEntityId,
    id?: BaseUniqueEntityId,
  ): Result<Group> {
    const guardResult = Guard.againstNullOrUndefinedOrEmpty(props.name, 'name');
    if (guardResult.isFailure) {
      return Result.fail<Group>(guardResult.getErrorValue());
    }

    const adminOrError = GroupMemberVO.createAdmin(adminUserId);
    if (adminOrError.isFailure) {
      return Result.fail<Group>('Admin created failed');
    }

    const group = new Group(
      {
        ...props,
        members: [adminOrError.getValue()],
      },
      id,
    );

    if (group) {
      group.addDomainEvent(new GroupCreatedDomainEvent(id, adminUserId));
    }

    return Result.ok<Group>(group);
  }

  get id(): BaseUniqueEntityId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get creatorId(): BaseUniqueEntityId {
    return this.props.creatorId;
  }

  get members(): GroupMemberVO[] {
    return this.props.members;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }
  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  public addMember(member: GroupMemberVO): Result<void> {
    const exists = this.props.members.some((m) =>
      m.userId.equals(member.userId),
    );
    if (exists) {
      return Result.fail('User is already a member of the group');
    }

    this.props.members.push(member);
    this.props.updatedAt = new Date();

    return Result.ok();
  }

  public removeMember(memberId: BaseUniqueEntityId): Result<void> {
    const index = this.props.members.findIndex((m) =>
      m.userId.equals(memberId),
    );
    if (index === -1) {
      return Result.fail('User is not a member of the group');
    }

    this.props.members.splice(index, 1);
    this.props.updatedAt = new Date();

    return Result.ok();
  }
}
