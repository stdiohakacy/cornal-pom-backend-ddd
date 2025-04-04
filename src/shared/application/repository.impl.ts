import { FindManyOptions, Repository } from 'typeorm';
import { BaseAggregateRoot } from '../domain/entities/base.aggregate-root';
import { BaseUniqueEntityId } from '../domain/identifier/base.unique-entity.id';
import { Either, left, right } from '../domain/patterns/result.pattern';
import { RepositoryException } from '../infrastructure/exception/repository.exception';
import {
  QueryCriteriaInterface,
  RepositoryInterface,
} from '../infrastructure/repository/repository.interface';

import { BASE_SCHEMA } from '../infrastructure/schema/base.schema';
import { BaseEntity } from '../infrastructure/schema/base.entity';

export abstract class BaseRepositoryImpl<
  EDomain extends BaseAggregateRoot<unknown>,
  EOrm extends BaseEntity,
> implements RepositoryInterface<EDomain>
{
  constructor(
    private readonly repository: Repository<EOrm>,
    private readonly schema: { TABLE_NAME: string } & typeof BASE_SCHEMA,
    private readonly mapper: {
      toDomain: (entity: EOrm) => EDomain;
      toPersistence: (domain: EDomain) => EOrm;
    },
  ) {}

  async findById(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryException, EDomain>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      if (!entity) return left(new RepositoryException('Entity not found'));

      return right(this.mapper.toDomain(entity));
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `findById`));
    }
  }

  async find(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryException, EDomain[]>> {
    try {
      const options: FindManyOptions = this.mapCriteriaToOptions(criteria);
      const entities = await this.repository.find(options);
      return right(entities.map((entity) => this.mapper.toDomain(entity)));
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `find`));
    }
  }

  async findAndCount(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryException, [EDomain[], number]>> {
    try {
      const options: FindManyOptions = this.mapCriteriaToOptions(criteria);
      const [entities, count] = await this.repository.findAndCount(options);
      return right([
        entities.map((entity) => this.mapper.toDomain(entity)),
        count,
      ]);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `findAndCount`));
    }
  }

  async count(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryException, number>> {
    try {
      const options: FindManyOptions = this.mapCriteriaToOptions(criteria);
      const count = await this.repository.count(options);
      return right(count);
    } catch (error) {
      return left(RepositoryException.from(error, `count`));
    }
  }

  async save(aggregate: EDomain): Promise<Either<RepositoryException, void>> {
    try {
      const entity = this.mapper.toPersistence(aggregate);
      await this.repository.save(entity);
      return right(undefined);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `save`));
    }
  }

  async saveMany(
    aggregates: EDomain[],
  ): Promise<Either<RepositoryException, void>> {
    try {
      const entities = aggregates.map((aggregate) =>
        this.mapper.toPersistence(aggregate),
      );
      await this.repository.save(entities);

      return right(undefined);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `saveMany`));
    }
  }

  async remove(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryException, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      if (!entity) return left(new RepositoryException('Entity not found'));

      await this.repository.remove(entity);

      return right(undefined);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `remove`));
    }
  }

  async removeMany(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryException, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entities = await query
        .where(`${this.schema.TABLE_NAME}.id IN (:...ids)`, {
          ids: ids.map((id) => id.toString()),
        })
        .getMany();

      if (!entities.length) {
        return right(undefined);
      }

      await this.repository.remove(entities);

      return right(undefined);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `removeMany`));
    }
  }

  async markAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryException, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      if (!entity) return left(new RepositoryException('Entity not found'));

      entity.deletedAt = new Date();
      await this.repository.save(entity);

      return right(undefined);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `markAsDeleted`));
    }
  }

  async markManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryException, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entities = await query
        .where(`${this.schema.TABLE_NAME}.id IN (:...ids)`, {
          ids: ids.map((id) => id.toString()),
        })
        .getMany();

      if (!entities.length) {
        return right(undefined);
      }

      for (const entity of entities) {
        entity.deletedAt = new Date();
      }

      await this.repository.save(entities);

      return right(undefined);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `markManyAsDeleted`));
    }
  }

  async unmarkAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryException, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      if (!entity) return left(new RepositoryException('Entity not found'));

      entity.deletedAt = null;
      await this.repository.save(entity);

      return right(undefined);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `unmarkAsDeleted`));
    }
  }

  async unmarkManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryException, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entities = await query
        .where(`${this.schema.TABLE_NAME}.id IN (:...ids)`, {
          ids: ids.map((id) => id.toString()),
        })
        .getMany();

      if (!entities.length) {
        return right(undefined);
      }

      for (const entity of entities) {
        entity.deletedAt = null;
      }

      await this.repository.save(entities);

      return right(undefined);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `unmarkManyAsDeleted`));
    }
  }

  async exists(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryException, boolean>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      return right(!!entity);
    } catch (error: unknown) {
      return left(RepositoryException.from(error, `exists`));
    }
  }

  private mapCriteriaToOptions(
    criteria?: QueryCriteriaInterface,
  ): FindManyOptions {
    if (!criteria) {
      return {};
    }

    const options: FindManyOptions = {};

    if (criteria.filters) {
      options.where = criteria.filters;
    }

    if (criteria.orderBy) {
      options.order = {
        [criteria.orderBy]: criteria.orderDirection || 'ASC',
      };
    }

    if (criteria.limit !== undefined) {
      options.take = criteria.limit;
    }

    if (criteria.offset !== undefined) {
      options.skip = criteria.offset;
    }

    return options;
  }
}
