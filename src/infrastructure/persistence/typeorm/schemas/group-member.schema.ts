import { BASE_SCHEMA } from '@shared/infrastructure/typeorm/schema/base.schema';

export const GROUP_MEMBER_SCHEMA = {
  TABLE_NAME: 'group_members',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    GROUP_ID: 'group_id',
    USER_ID: 'user_id',
    ROLE: 'role',
    JOINED_AT: 'joined_at',
  },
  RELATED_ONE: {
    USER: 'user',
    GROUP: 'group',
  },
  RELATED_MANY: {},
};
