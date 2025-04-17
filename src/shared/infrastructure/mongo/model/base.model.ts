import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/base.entity';
import {
  BaseValueObject,
  ValueObjectProps,
} from '@shared/domain/value-objects/base.vo';

/**
 * BaseMongoModel map between Domain Entity/Aggregate <-> Persistence (Mongo)
 * TDomain: It's Entity/AggregateRoot
 * TPersistence: (JSON, Mongo Document properties, etc)
 */
export abstract class BaseMongoModel<
  TDomain extends
    | BaseEntity<BaseEntityProps>
    | BaseValueObject<ValueObjectProps>,
  TPersistence,
> {
  abstract toPersistence(entity: TDomain): TPersistence;
  abstract toDomain(raw: TPersistence): TDomain;
}

export interface BaseMongoModelProps {
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
