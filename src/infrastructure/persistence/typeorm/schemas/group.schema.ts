import { BASE_SCHEMA } from '@shared/infrastructure/typeorm/schema/base.schema';

export const GROUP_SCHEMA = {
  TABLE_NAME: 'groups',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    NAME: 'name',
    DESCRIPTION: 'description',
    CREATOR_ID: 'creator_id',
  },
  RELATED_ONE: {},
  RELATED_MANY: {
    GROUP_MEMBERS: 'group_members',
  },
};
