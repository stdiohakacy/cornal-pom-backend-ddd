import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ROUTE_LOCATION_CONVERSION_SCHEMA } from '../schemas/route-location-conversion.schema';
import { BaseEntity } from 'src/shared/infrastructure/schema/base.entity';
import { ServiceScopeEntity } from './service-scope.entity';

@Entity(ROUTE_LOCATION_CONVERSION_SCHEMA.TABLE_NAME)
export class RouteLocationConversionEntity extends BaseEntity {
  @PrimaryColumn({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.SERVICE_SCOPE_CODE,
    type: 'varchar',
    precision: 3,
    nullable: false,
  })
  serviceScopeCode: string;

  @PrimaryColumn({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.ORIGINAL_LOCATION_CODE,
    type: 'varchar',
    precision: 5,
    nullable: false,
  })
  originalLocationCode: string;

  @PrimaryColumn({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.CONVERSION_LOCATION_CODE,
    type: 'varchar',
    precision: 5,
    nullable: false,
  })
  conversionLocationCode: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.POR_APPLY_FLAG,
    type: 'varchar',
    precision: 1,
    nullable: true,
  })
  porApplyFlag?: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.POL_APPLY_FLAG,
    type: 'varchar',
    precision: 1,
    nullable: true,
  })
  polApplyFlag?: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.POD_APPLY_FLAG,
    type: 'varchar',
    precision: 1,
    nullable: true,
  })
  podApplyFlag?: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.DEL_APPLY_FLAG,
    type: 'varchar',
    precision: 1,
    nullable: true,
  })
  delApplyFlag?: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.PRE_RELAY_PORT_APPLY_FLAG,
    type: 'varchar',
    precision: 1,
    nullable: true,
  })
  preRelayPortApplyFlag?: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.POST_RELAY_PORT_APPLY_FLAG,
    type: 'varchar',
    precision: 1,
    nullable: true,
  })
  postRelayPortApplyFlag?: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.CREATE_USER_ID,
    type: 'varchar',
    precision: 100,
    nullable: true,
  })
  createUserId?: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.CREATE_DATE_TIME,
    type: 'timestamp',
    nullable: true,
  })
  createDateTime?: Date;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.UPDATE_USER_ID,
    type: 'varchar',
    precision: 100,
    nullable: true,
  })
  updateUserId?: string;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.UPDATE_DATE_TIME,
    type: 'timestamp',
    nullable: true,
  })
  updateDateTime?: Date;

  @Column({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.COLUMNS.EDW_UPDATE_DATE_TIME,
    type: 'timestamp',
    nullable: true,
  })
  edwUpdateDateTime?: Date;

  @ManyToOne(
    () => ServiceScopeEntity,
    (serviceScope) => serviceScope.routeLocationConversions,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: ROUTE_LOCATION_CONVERSION_SCHEMA.RELATED_ONE.SERVICE_SCOPE,
  })
  serviceScope: ServiceScopeEntity;
}
