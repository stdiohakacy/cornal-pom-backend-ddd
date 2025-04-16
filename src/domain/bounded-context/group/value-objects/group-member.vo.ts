import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { Guard } from '@shared/domain/patterns/guard.pattern';
import { Result } from '@shared/domain/patterns/result.pattern';
import {
  BaseValueObject,
  ValueObjectProps,
} from '@shared/domain/value-objects/base.vo';

export interface GroupMemberProps extends ValueObjectProps {
  userId: BaseUniqueEntityId;
  groupId: BaseUniqueEntityId;
  role: 'admin' | 'member';
  joinedAt: Date;
}

export class GroupMemberVO extends BaseValueObject<GroupMemberProps> {
  private constructor(props: GroupMemberProps) {
    super(props);
  }

  get userId(): BaseUniqueEntityId {
    return this.props.userId;
  }

  get groupId(): BaseUniqueEntityId {
    return this.props.groupId;
  }

  get role(): 'admin' | 'member' {
    return this.props.role;
  }

  get joinedAt(): Date {
    return this.props.joinedAt;
  }

  public static create(props: GroupMemberProps) {
    const guardResult = Guard.combine([
      Guard.againstNullOrUndefined(props.userId, 'userId'),
      Guard.againstNullOrUndefined(props.groupId, 'groupId'),
      Guard.againstNullOrUndefined(props.joinedAt, 'joinedAt'),
      Guard.againstNullOrUndefined(props.role, 'role'),
      Guard.isOneOf(props.role, ['admin', 'member'], 'role'),
    ]);

    if (guardResult.isFailure) {
      return Result.fail<GroupMemberVO>(guardResult.getErrorValue());
    }

    return Result.ok(new GroupMemberVO(props));
  }

  static createAdmin(
    userId: BaseUniqueEntityId,
    groupId?: BaseUniqueEntityId,
  ): Result<GroupMemberVO> {
    return this.create({
      userId,
      groupId,
      role: 'admin',
      joinedAt: new Date(),
    });
  }

  static createMember(
    userId: BaseUniqueEntityId,
    groupId?: BaseUniqueEntityId,
  ): Result<GroupMemberVO> {
    return this.create({
      userId,
      groupId,
      role: 'member',
      joinedAt: new Date(),
    });
  }
}
