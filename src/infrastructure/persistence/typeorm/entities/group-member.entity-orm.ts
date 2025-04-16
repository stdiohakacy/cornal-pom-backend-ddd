import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from '@shared/infrastructure/typeorm/schema/base.entity';
import { GROUP_MEMBER_SCHEMA } from '../schemas/group-member.schema';
import { GroupEntityOrm } from './group.entity-orm';
import { UserEntityOrm } from './user.entity-orm';

@Entity(GROUP_MEMBER_SCHEMA.TABLE_NAME)
export class GroupMemberEntityOrm extends BaseEntity {
  @PrimaryColumn({
    name: GROUP_MEMBER_SCHEMA.COLUMNS.USER_ID,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Index()
  userId: string;

  @PrimaryColumn({
    name: GROUP_MEMBER_SCHEMA.COLUMNS.GROUP_ID,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Index()
  groupId: string;

  @Column({
    name: GROUP_MEMBER_SCHEMA.COLUMNS.ROLE,
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  role: string;

  @Column({
    name: GROUP_MEMBER_SCHEMA.COLUMNS.JOINED_AT,
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  joinedAt: Date;

  @ManyToOne(() => GroupEntityOrm, (group) => group.groupMembers)
  @JoinColumn({ name: 'groupId' })
  group: GroupEntityOrm;

  @ManyToOne(() => UserEntityOrm, (user) => user.groupMembers)
  @JoinColumn({ name: 'userId' })
  user: UserEntityOrm;
}
