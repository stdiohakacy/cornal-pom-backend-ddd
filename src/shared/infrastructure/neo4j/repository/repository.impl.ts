import {
  QueryCriteriaInterface,
  RepositoryInterface,
} from '@shared/application/repository.interface';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { Either, left, right } from '@shared/domain/patterns/result.pattern';
import { RepositoryError } from '@shared/errors/infrastructure.error';
import neo4j, { Driver, Session, Transaction } from 'neo4j-driver';
import { BaseModelNeo4j } from '../model/base.model';
import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/base.entity';

export abstract class BaseRepositoryImpl<
  TDomain extends BaseEntity<BaseEntityProps>,
  TPersistence,
> implements RepositoryInterface<TDomain>
{
  constructor(
    private readonly driver: Driver,
    protected readonly label: string,
    protected readonly model: BaseModelNeo4j<TDomain, TPersistence>,
  ) {}

  protected getWriteSession(): Session {
    return this.driver.session({ defaultAccessMode: neo4j.session.WRITE });
  }

  protected getReadSession(): Session {
    return this.driver.session({ defaultAccessMode: neo4j.session.READ });
  }

  find(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, TDomain[]>> {
    throw new Error('Method not implemented.');
  }

  findAndCount(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, [TDomain[], number]>> {
    throw new Error('Method not implemented.');
  }

  count(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, number>> {
    throw new Error('Method not implemented.');
  }

  async save(entity: TDomain): Promise<Either<RepositoryError, void>> {
    const session = this.getWriteSession();
    try {
      const props = this.model.toPersistence(entity);

      const cypher = `
        MERGE (n:${this.label} {id: $id})
        SET n += $props
      `;

      await session.run(cypher, {
        id: entity.id.toString(),
        props,
      });

      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[${this.label}] Save failed`, error));
    } finally {
      await session.close();
    }
  }

  async saveMany(entities: TDomain[]): Promise<Either<RepositoryError, void>> {
    const session = this.getWriteSession();
    let tx: Transaction | null = null;
    try {
      tx = session.beginTransaction();
      for (const entity of entities) {
        const props = this.model.toPersistence(entity);
        await tx.run(`MERGE (n:${this.label} {id: $id}) SET n += $props`, {
          id: entity.id.toString(),
          props,
        });
      }
      await tx.commit();
      return right(undefined);
    } catch (error) {
      if (tx) await tx.rollback();
      return left(
        new RepositoryError(`[${this.label}] SaveMany failed`, error),
      );
    } finally {
      await session.close();
    }
  }

  async remove(id: BaseUniqueEntityId): Promise<Either<RepositoryError, void>> {
    const session = this.getWriteSession();
    try {
      await session.run(`MATCH (n:${this.label} {id: $id}) DETACH DELETE n`, {
        id: id.toString(),
      });
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[${this.label}] Remove failed`, error));
    } finally {
      await session.close();
    }
  }

  async removeMany(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    const session = this.getWriteSession();
    const idList = ids.map((i) => i.toString());
    try {
      await session.run(
        `MATCH (n:${this.label}) WHERE n.id IN $ids DETACH DELETE n`,
        { ids: idList },
      );
      return right(undefined);
    } catch (error) {
      return left(
        new RepositoryError(`[${this.label}] RemoveMany failed`, error),
      );
    } finally {
      await session.close();
    }
  }

  async markAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>> {
    const session = this.getWriteSession();
    try {
      await session.run(
        `MATCH (n:${this.label} {id: $id}) SET n.deletedAt = datetime()`,
        { id: id.toString() },
      );
      return right(undefined);
    } catch (error) {
      return left(
        new RepositoryError(`[${this.label}] MarkAsDeleted failed`, error),
      );
    } finally {
      await session.close();
    }
  }

  async markManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    const session = this.getWriteSession();
    const idList = ids.map((i) => i.toString());
    try {
      await session.run(
        `MATCH (n:${this.label}) WHERE n.id IN $ids SET n.deletedAt = datetime()`,
        { ids: idList },
      );
      return right(undefined);
    } catch (error) {
      return left(
        new RepositoryError(`[${this.label}] MarkManyAsDeleted failed`, error),
      );
    } finally {
      await session.close();
    }
  }

  async unmarkAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>> {
    const session = this.getWriteSession();
    try {
      await session.run(
        `MATCH (n:${this.label} {id: $id}) REMOVE n.deletedAt`,
        { id: id.toString() },
      );
      return right(undefined);
    } catch (error) {
      return left(
        new RepositoryError(`[${this.label}] UnmarkAsDeleted failed`, error),
      );
    } finally {
      await session.close();
    }
  }

  async unmarkManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    const session = this.getWriteSession();
    const idList = ids.map((i) => i.toString());
    try {
      await session.run(
        `MATCH (n:${this.label}) WHERE n.id IN $ids REMOVE n.deletedAt`,
        { ids: idList },
      );
      return right(undefined);
    } catch (error) {
      return left(
        new RepositoryError(
          `[${this.label}] UnmarkManyAsDeleted failed`,
          error,
        ),
      );
    } finally {
      await session.close();
    }
  }

  async exists(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, boolean>> {
    const session = this.getReadSession();
    try {
      const result = await session.run(
        `MATCH (n:${this.label} {id: $id}) RETURN n LIMIT 1`,
        { id: id.toString() },
      );

      return result.records.length > 0 ? right(true) : right(false);
    } catch (error) {
      return left(new RepositoryError(`[${this.label}] exists failed`, error));
    } finally {
      await session.close();
    }
  }
}
