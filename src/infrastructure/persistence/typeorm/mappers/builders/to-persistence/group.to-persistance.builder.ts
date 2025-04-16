import { BaseBuilder } from '@shared/infrastructure/typeorm/repository/base.builder';
import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';
import { GroupEntityOrm } from '../../../entities/group.entity-orm';
import { GroupMemberEntityOrm } from '../../../entities/group-member.entity-orm';
import { GroupMemberVO } from 'src/domain/bounded-context/group/value-objects/group-member.vo';

export class GroupToPersistenceBuilder extends BaseBuilder<
  Group,
  GroupEntityOrm
> {
  private group: Group;

  public fromDomain(group: Group): this {
    this.group = group;
    return this;
  }

  public build(): GroupEntityOrm {
    const groupEntityOrm = new GroupEntityOrm();

    groupEntityOrm.id = this.group.id.toString();
    groupEntityOrm.name = this.group.name;
    groupEntityOrm.description = this.group.description;
    groupEntityOrm.creatorId = this.group.creatorId.toString();
    groupEntityOrm.createdAt = this.group.props.createdAt;
    groupEntityOrm.updatedAt = this.group.props.updatedAt;
    groupEntityOrm.deletedAt = this.group.props.deletedAt;

    groupEntityOrm.groupMembers = this.group.props.members.map(
      (member: GroupMemberVO) => {
        const memberEntityOrm = new GroupMemberEntityOrm();

        memberEntityOrm.userId = member.userId.toString();
        memberEntityOrm.groupId = member.groupId.toString();
        memberEntityOrm.role = member.role;
        memberEntityOrm.joinedAt = member.joinedAt;

        return memberEntityOrm;
      },
    );

    return groupEntityOrm;
  }
}
