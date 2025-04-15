import { BaseUniqueEntityId } from '../domain/identifier/base.unique-entity.id';
import { Either } from '../domain/patterns/result.pattern';
import { RepositoryError } from '@shared/errors/infrastructure.error';

export interface QueryCriteriaInterface {
  filters?: Record<string, unknown>;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}

/**
 * Generic repository interface for entities
 * T extends AggregateRoot to ensure repositories only work with entities
 */
export interface RepositoryInterface<TEntity> {
  /**
   * Find an entity by its ID
   */
  // findById(id: BaseUniqueEntityId): Promise<Either<RepositoryError, T>>;

  /**
   * Find entities by specified criteria
   */
  find(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, TEntity[]>>;

  /**
   * Find entities and their count
   */
  findAndCount(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, [TEntity[], number]>>;

  /**
   * Get total count of entities matching criteria
   */
  count(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryError, number>>;

  /**
   * Save an entity (create or update)
   */
  save(entity: TEntity): Promise<Either<RepositoryError, void>>;

  /**
   * Save multiple entities in a single transaction
   */
  saveMany(entities: TEntity[]): Promise<Either<RepositoryError, void>>;

  /**
   * Remove an entity permanently
   */
  remove(id: BaseUniqueEntityId): Promise<Either<RepositoryError, void>>;

  /**
   * Remove multiple entities permanently
   */
  removeMany(ids: BaseUniqueEntityId[]): Promise<Either<RepositoryError, void>>;

  /**
   * Mark an entity as deleted without removing it
   * This is a domain concept rather than infrastructure "soft delete"
   */
  markAsDeleted(id: BaseUniqueEntityId): Promise<Either<RepositoryError, void>>;

  /**
   * Mark multiple entities as deleted
   */
  markManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>>;

  /**
   * Restore a deleted entity
   */
  unmarkAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>>;

  /**
   * Restore multiple deleted entities
   */
  unmarkManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>>;

  /**
   * Check if an entity exists by ID
   */
  exists(id: BaseUniqueEntityId): Promise<Either<RepositoryError, boolean>>;
}
