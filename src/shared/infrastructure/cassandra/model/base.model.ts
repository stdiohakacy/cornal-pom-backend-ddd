import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/base.entity';
import {
  BaseValueObject,
  ValueObjectProps,
} from '@shared/domain/value-objects/base.vo';

/**
 * BaseModelCassandra: map between Domain Entity/Aggregate <-> Cassandra Row
 * TDomain: Domain Entity or Value Object
 * TPersistence: Cassandra Row Object
 */
export abstract class BaseModelCassandra<
  TDomain extends
    | BaseEntity<BaseEntityProps>
    | BaseValueObject<ValueObjectProps>,
  TPersistence,
> {
  abstract toPersistence(entity: TDomain): TPersistence;
  abstract toDomain(raw: TPersistence): TDomain;
}

export interface BaseCassandraModelProps {
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
