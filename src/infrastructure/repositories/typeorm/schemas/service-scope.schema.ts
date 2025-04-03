import { BASE_SCHEMA } from 'src/shared/infrastructure/schema/base.schema';

export const SERVICE_SCOPE_SCHEMA = {
  TABLE_NAME: 'service_scopes',
  COLUMNS: {
    ...BASE_SCHEMA.COLUMNS,
    SERVICE_SCOPE_CODE: 'service_scope_code',
    SERVICE_SCOPE_NAME: 'service_scope_name',
    FMC_FILE_FLAG: 'fmc_file_flag',
    TARIFF_PREFIX_CODE: 'tariff_prefix_code',
    TARIFF_NUMBER: 'tariff_number',
    CONFERENCE_FLAG: 'conference_flag',
    SERVICE_SCOPE_BOUND_CODE: 'service_scope_bound_code',
    CREATE_USER_ID: 'create_user_id',
    CREATE_DATE_TIME: 'create_date_time',
    UPDATE_USER_ID: 'update_user_id',
    UPDATE_DATE_TIME: 'update_date_time',
    DELETE_FLAG: 'delete_flag',
    EAI_EVNT_DATE_TIME: 'eai_evnt_date_time',
    EAI_IF_ID: 'eai_if_id',
    MODIFY_COST_CTR_CODE: 'modify_cost_ctr_code',
    EDW_UPDATE_DATE_TIME: 'edw_update_date_time',
    MODIFY_SERVICE_GROUP_CODE: 'modify_service_group_code',
    DOMINANT_FLAG: 'dominant_flag',
    SERVICE_SCOPE_GROUP_NAME: 'service_scope_group_name',
    SERVICE_SCOPE_TRADE_CODE: 'service_scope_trade_code',
    REFER_DOMINANT_FLAG: 'refer_dominant_flag',
  },
  RELATED_ONE: {},
  RELATED_MANY: {
    ROUTE_LOCATION_CONVERSIONS: 'route_location_conversions',
  },
};
