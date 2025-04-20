import {
  QueryCriteriaInterface,
  RepositoryInterface,
} from '@shared/application/repository.interface';
import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/base.entity';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { Either, left, right } from '@shared/domain/patterns/result.pattern';
import { RepositoryError } from '@shared/errors/infrastructure.error';
import { BaseModelCassandra } from '../model/base.model';
import { Client } from 'cassandra-driver';

export abstract class BaseCassandraRepositoryImpl<
  TDomain extends BaseEntity<BaseEntityProps>,
  TPersistence,
> implements RepositoryInterface<TDomain>
{
  constructor(
    protected readonly cassandraClient: Client,
    protected readonly tableName: string,
    protected readonly model: BaseModelCassandra<TDomain, TPersistence>,
  ) {}

  findAndCount(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, [TDomain[], number]>> {
    throw new Error('Method not implemented.');
  }
  removeMany(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    throw new Error('Method not implemented.');
  }
  markAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>> {
    throw new Error('Method not implemented.');
  }
  markManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    throw new Error('Method not implemented.');
  }
  unmarkAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>> {
    throw new Error('Method not implemented.');
  }
  unmarkManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    throw new Error('Method not implemented.');
  }

  async find(): Promise<Either<RepositoryError, TDomain[]>> {
    try {
      const result = await this.cassandraClient.execute(
        `SELECT * FROM ${this.tableName}`,
      );
      const entities = result.rows.map((row) =>
        this.model.toDomain(row as TPersistence),
      );
      return right(entities);
    } catch (error) {
      return left(new RepositoryError(`[Cassandra] Find failed`, error));
    }
  }

  async count(): Promise<Either<RepositoryError, number>> {
    try {
      const result = await this.cassandraClient.execute(
        `SELECT COUNT(*) FROM ${this.tableName}`,
      );
      return right(result.first()['count']);
    } catch (error) {
      return left(new RepositoryError(`[Cassandra] Count failed`, error));
    }
  }

  async save(entity: TDomain): Promise<Either<RepositoryError, void>> {
    try {
      const data = this.model.toPersistence(entity);
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data)
        .map(() => '?')
        .join(', ');
      const values = Object.values(data);

      await this.cassandraClient.execute(
        `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`,
        values,
        { prepare: true },
      );

      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Cassandra] Save failed`, error));
    }
  }

  async saveMany(entities: TDomain[]): Promise<Either<RepositoryError, void>> {
    const queries = entities.map((entity) => {
      const data = this.model.toPersistence(entity);
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data)
        .map(() => '?')
        .join(', ');
      const values = Object.values(data);

      return {
        query: `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`,
        params: values,
      };
    });

    try {
      await this.cassandraClient.batch(queries, { prepare: true });
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Cassandra] SaveMany failed`, error));
    }
  }

  async exists(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, boolean>> {
    try {
      const result = await this.cassandraClient.execute(
        `SELECT id FROM ${this.tableName} WHERE id = ? LIMIT 1`,
        [id.toString()],
        { prepare: true },
      );
      return right(result.rowLength > 0);
    } catch (error) {
      return left(new RepositoryError(`[Cassandra] Exists failed`, error));
    }
  }

  async remove(id: BaseUniqueEntityId): Promise<Either<RepositoryError, void>> {
    try {
      await this.cassandraClient.execute(
        `DELETE FROM ${this.tableName} WHERE id = ?`,
        [id.toString()],
        { prepare: true },
      );
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Cassandra] Remove failed`, error));
    }
  }
}
