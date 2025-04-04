import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateServiceScopeAndRouteLocationConversionTables1743668010290
  implements MigrationInterface
{
  name = 'CreateServiceScopeAndRouteLocationConversionTables1743668010290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "route_location_conversions" ("service_scope_code" character varying(3) NOT NULL, "original_location_code" character varying(5) NOT NULL, "conversion_location_code" character varying(5) NOT NULL, "por_apply_flag" character varying(1), "pol_apply_flag" character varying(1), "pod_apply_flag" character varying(1), "del_apply_flag" character varying(1), "pre_relay_port_apply_flag" character varying(1), "post_relay_port_apply_flag" character varying(1), "create_user_id" character varying(100), "create_date_time" TIMESTAMP, "update_user_id" character varying(100), "update_date_time" TIMESTAMP, "edw_update_date_time" TIMESTAMP, CONSTRAINT "PK_4e8c7a3a4fbc2225a29f096e992" PRIMARY KEY ("service_scope_code", "original_location_code", "conversion_location_code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "service_scopes" ("service_scope_code" character varying(3) NOT NULL, "service_scope_name" character varying(50), "fmc_file_flag" character varying(1), "tariff_prefix_code" character varying(2), "tariff_number" character varying(4), "conference_flag" character varying(1), "service_scope_bound_code" character varying(1), "create_user_id" character varying(100), "create_date_time" TIMESTAMP, "update_user_id" character varying(100), "update_date_time" TIMESTAMP, "delete_flag" character varying(1), "eai_evnt_date_time" TIMESTAMP, "eai_if_id" character varying(32), "modify_cost_ctr_code" character varying(10), "edw_update_date_time" TIMESTAMP, "modify_service_group_code" character varying(8), "dominant_flag" character varying(1), "service_scope_group_name" character varying(50), "service_scope_trade_code" character varying(4), "refer_dominant_flag" character varying(1), CONSTRAINT "PK_b19952dc570a678bbc54c17bd36" PRIMARY KEY ("service_scope_code"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "route_location_conversions" ADD CONSTRAINT "FK_76bbe486e70c2a1e18bb90859f2" FOREIGN KEY ("service_scope_code") REFERENCES "service_scopes"("service_scope_code") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "route_location_conversions" DROP CONSTRAINT "FK_76bbe486e70c2a1e18bb90859f2"`,
    );
    await queryRunner.query(`DROP TABLE "service_scopes"`);
    await queryRunner.query(`DROP TABLE "route_location_conversions"`);
  }
}
