import { FindManyOptions, Repository } from 'typeorm';
import { BaseUniqueEntityId } from '../../../domain/identifier/base.unique-entity.id';
import { Either, left, right } from '../../../domain/patterns/result.pattern';
import {
  QueryCriteriaInterface,
  RepositoryInterface,
} from '../../../application/repository.interface';

import { BASE_SCHEMA } from '../schema/base.schema';
import { BaseEntity as BaseInfrastructureEntity } from '../schema/base.entity';
import { BaseEntity as BaseDomainEntity } from '@shared/domain/entities/base.entity';
import { RepositoryError } from '@shared/errors/infrastructure.error';

export abstract class BaseRepositoryImpl<
  EDomain extends BaseDomainEntity<BaseInfrastructureEntity>,
  EOrm extends BaseInfrastructureEntity,
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

  // async findById(
  //   id: BaseUniqueEntityId,
  // ): Promise<Either<RepositoryError, EDomain>> {
  //   try {
  //     const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
  //     const entity = await query
  //       .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
  //       .getOne();

  //     if (!entity) return left(new RepositoryError('Entity not found'));

  //     return right(this.mapper.toDomain(entity));
  //   } catch (error) {
  //     return left(RepositoryError.from(error, `findById`));
  //   }
  // }

  async find(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, EDomain[]>> {
    try {
      const options: FindManyOptions = this.mapCriteriaToOptions(criteria);
      const entities = await this.repository.find(options);
      return right(entities.map((entity) => this.mapper.toDomain(entity)));
    } catch (error) {
      return left(new RepositoryError(`find`, error));
    }
  }

  async findAndCount(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, [EDomain[], number]>> {
    try {
      const options: FindManyOptions = this.mapCriteriaToOptions(criteria);
      const [entities, count] = await this.repository.findAndCount(options);
      return right([
        entities.map((entity) => this.mapper.toDomain(entity)),
        count,
      ]);
    } catch (error) {
      return left(new RepositoryError(`findAndCount`, error));
    }
  }

  async count(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, number>> {
    try {
      const options: FindManyOptions = this.mapCriteriaToOptions(criteria);
      const count = await this.repository.count(options);
      return right(count);
    } catch (error) {
      return left(new RepositoryError(`count`, error));
    }
  }

  async save(aggregate: EDomain): Promise<Either<RepositoryError, void>> {
    try {
      const entity = this.mapper.toPersistence(aggregate);
      await this.repository.save(entity);
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`save`, error, 'save'));
    }
  }

  async saveMany(
    aggregates: EDomain[],
  ): Promise<Either<RepositoryError, void>> {
    try {
      const entities = aggregates.map((aggregate) =>
        this.mapper.toPersistence(aggregate),
      );

      await this.repository.save(entities);
      return right(undefined);
    } catch (error) {
      return left(
        new RepositoryError(
          'Failed to save route location conversions',
          error,
          'saveMany',
        ),
      );
    }
  }

  async remove(id: BaseUniqueEntityId): Promise<Either<RepositoryError, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      if (!entity) return left(new RepositoryError('Entity not found'));

      await this.repository.remove(entity);

      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`remove`, error));
    }
  }

  async removeMany(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
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
    } catch (error) {
      return left(new RepositoryError(`removeMany`, error));
    }
  }

  async markAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      if (!entity) return left(new RepositoryError('Entity not found'));

      entity.deletedAt = new Date();
      await this.repository.save(entity);

      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`markAsDeleted`, error));
    }
  }

  async markManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
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
    } catch (error) {
      return left(new RepositoryError(`markManyAsDeleted`, error));
    }
  }

  async unmarkAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      if (!entity) return left(new RepositoryError('Entity not found'));

      entity.deletedAt = null;
      await this.repository.save(entity);

      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`unmarkAsDeleted`, error));
    }
  }

  async unmarkManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
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
    } catch (error) {
      return left(new RepositoryError(`unmarkManyAsDeleted`, error));
    }
  }

  async exists(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, boolean>> {
    try {
      const query = this.repository.createQueryBuilder(this.schema.TABLE_NAME);
      const entity = await query
        .where(`${this.schema.TABLE_NAME}.id = :id`, { id: id.toString() })
        .getOne();

      return right(!!entity);
    } catch (error) {
      return left(new RepositoryError(`exists`, error));
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
