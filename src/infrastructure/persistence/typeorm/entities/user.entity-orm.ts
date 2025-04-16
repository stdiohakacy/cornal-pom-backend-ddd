import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/infrastructure/typeorm/schema/base.entity';
import { USER_SCHEMA } from '../schemas/user.schema';
import { GroupMemberEntityOrm } from './group-member.entity-orm';

@Entity(USER_SCHEMA.TABLE_NAME)
export class UserEntityOrm extends BaseEntity {
  @Column({
    name: USER_SCHEMA.COLUMNS.NAME,
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: USER_SCHEMA.COLUMNS.EMAIL,
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @OneToMany(() => GroupMemberEntityOrm, (groupMembers) => groupMembers.user)
  groupMembers: GroupMemberEntityOrm[];
}
