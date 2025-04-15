import { BASE_SCHEMA } from '@shared/infrastructure/typeorm/schema/base.schema';

export const USER_SCHEMA = {
  TABLE_NAME: 'users',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    NAME: 'name',
    EMAIL: 'email',
  },
  RELATED_ONE: {},
  RELATED_MANY: {
    GROUP_MEMBERS: 'group_members',
  },
};
