import { GroupEntityOrm } from '../../../entities/group.entity-orm';
import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { GroupMemberVO } from 'src/domain/bounded-context/group/value-objects/group-member.vo';

export class GroupToDomainBuilder {
  constructor(private readonly _group: GroupEntityOrm) {}

  public build(): Group {
    if (!this._group) {
      throw new Error('ORM entity is not set for GroupToDomainBuilder');
    }

    const members: GroupMemberVO[] = [];

    for (const member of this._group.groupMembers || []) {
      const memberOrError = GroupMemberVO.create({
        userId: new BaseUniqueEntityId(member.userId),
        groupId: new BaseUniqueEntityId(member.groupId),
        role: member.role as 'admin' | 'member',
        joinedAt: new Date(member.joinedAt),
      });

      if (memberOrError.isFailure) {
        throw new Error(
          `Invalid GroupMemberVO from ORM: ${memberOrError.getErrorValue()}`,
        );
      }

      members.push(memberOrError.getValue());
    }

    const result = Group.create(
      {
        name: this._group.name,
        description: this._group.description,
        creatorId: new BaseUniqueEntityId(this._group.creatorId),
        members: members,
        createdAt: this._group.createdAt,
        updatedAt: this._group.updatedAt,
        deletedAt: this._group.deletedAt,
      },
      new BaseUniqueEntityId(this._group.id),
    );

    if (result.isFailure) {
      throw new Error(
        `Invalid GroupToDomainBuilder from ORM: ${result.getErrorValue()}`,
      );
    }

    return result.getValue();
  }
}
