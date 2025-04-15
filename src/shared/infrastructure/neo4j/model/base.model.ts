import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/base.entity';
import {
  BaseValueObject,
  ValueObjectProps,
} from '@shared/domain/value-objects/base.vo';

/**
 * BaseModelNeo4j map between Domain Entity/Aggregate <-> Persistence (Neo4j)
 * TDomain: It's Entity/AggregateRoot
 * TPersistence: (JSON, Neo4j Node properties, etc)
 */
export abstract class BaseModelNeo4j<
  TDomain extends
    | BaseEntity<BaseEntityProps>
    | BaseValueObject<ValueObjectProps>,
  TPersistence,
> {
  abstract toPersistence(entity: TDomain): TPersistence;
  abstract toDomain(raw: TPersistence): TDomain;
}

export interface AbstractNeo4jModelProps {
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
