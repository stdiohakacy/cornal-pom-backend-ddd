import { BASE_SCHEMA } from 'src/shared/infrastructure/schema/base.schema';

export const ROUTE_LOCATION_CONVERSION_SCHEMA = {
  TABLE_NAME: 'route_location_conversions',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    SERVICE_SCOPE_CODE: 'service_scope_code',
    ORIGINAL_LOCATION_CODE: 'original_location_code',
    CONVERSION_LOCATION_CODE: 'conversion_location_code',
    POR_APPLY_FLAG: 'por_apply_flag',
    POL_APPLY_FLAG: 'pol_apply_flag',
    POD_APPLY_FLAG: 'pod_apply_flag',
    DEL_APPLY_FLAG: 'del_apply_flag',
    PRE_RELAY_PORT_APPLY_FLAG: 'pre_relay_port_apply_flag',
    POST_RELAY_PORT_APPLY_FLAG: 'post_relay_port_apply_flag',
    CREATE_USER_ID: 'create_user_id',
    CREATE_DATE_TIME: 'create_date_time',
    UPDATE_USER_ID: 'update_user_id',
    UPDATE_DATE_TIME: 'update_date_time',
    EDW_UPDATE_DATE_TIME: 'edw_update_date_time',
  },
  RELATED_ONE: {
    SERVICE_SCOPE: 'service_scope_code',
  },
  RELATED_MANY: {},
};
