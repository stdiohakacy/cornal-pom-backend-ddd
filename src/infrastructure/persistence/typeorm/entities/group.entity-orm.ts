import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/infrastructure/typeorm/schema/base.entity';
import { GROUP_SCHEMA } from '../schemas/group.schema';
import { GroupMemberEntityOrm } from './group-member.entity-orm';

@Entity(GROUP_SCHEMA.TABLE_NAME)
export class GroupEntityOrm extends BaseEntity {
  @Column({
    name: GROUP_SCHEMA.COLUMNS.NAME,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: GROUP_SCHEMA.COLUMNS.DESCRIPTION,
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    name: GROUP_SCHEMA.COLUMNS.CREATOR_ID,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  creatorId: string;

  @OneToMany(() => GroupMemberEntityOrm, (groupMembers) => groupMembers.group, {
    cascade: true,
    eager: true,
  })
  groupMembers: GroupMemberEntityOrm[];
}
