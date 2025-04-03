import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SERVICE_SCOPE_SCHEMA } from '../schemas/service-scope.schema';
import { BaseEntity } from 'src/shared/infrastructure/schema/base.entity';
import { RouteLocationConversionEntity } from './route-location-conversion.entity';

@Entity(SERVICE_SCOPE_SCHEMA.TABLE_NAME)
export class ServiceScopeEntity {
  @PrimaryColumn({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_CODE,
    type: 'varchar',
    length: 3,
    nullable: false,
  })
  serviceScopeCode: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_NAME,
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  serviceScopeName?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.FMC_FILE_FLAG,
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  fmcFileFlag?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.TARIFF_PREFIX_CODE,
    type: 'varchar',
    length: 2,
    nullable: true,
  })
  tariffPrefixCode?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.TARIFF_NUMBER,
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  tariffNumber?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.CONFERENCE_FLAG,
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  conferenceFlag?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_BOUND_CODE,
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  serviceScopeBoundCode?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.CREATE_USER_ID,
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  createUserId?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.CREATE_DATE_TIME,
    type: 'timestamp',
    nullable: true,
  })
  createDateTime?: Date;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.UPDATE_USER_ID,
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  updateUserId?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.UPDATE_DATE_TIME,
    type: 'timestamp',
    nullable: true,
  })
  updateDateTime?: Date;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.DELETE_FLAG,
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  deleteFlag?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.EAI_EVNT_DATE_TIME,
    type: 'timestamp',
    nullable: true,
  })
  eaiEvntDateTime?: Date;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.EAI_IF_ID,
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  eaiIfId?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.MODIFY_COST_CTR_CODE,
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  modifyCostCtrCode?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.EDW_UPDATE_DATE_TIME,
    type: 'timestamp',
    nullable: true,
  })
  edwUpdateDateTime?: Date;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.MODIFY_SERVICE_GROUP_CODE,
    type: 'varchar',
    length: 8,
    nullable: true,
  })
  modifyServiceGroupCode?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.DOMINANT_FLAG,
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  dominantFlag?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_GROUP_NAME,
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  serviceScopeGroupName?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.SERVICE_SCOPE_TRADE_CODE,
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  serviceScopeTradeCode?: string;

  @Column({
    name: SERVICE_SCOPE_SCHEMA.COLUMNS.REFER_DOMINANT_FLAG,
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  referDominantFlag?: string;

  @OneToMany(
    () => RouteLocationConversionEntity,
    (routeLocationConversion) => routeLocationConversion.serviceScope,
    { cascade: true },
  )
  routeLocationConversions: RouteLocationConversionEntity[];
}
