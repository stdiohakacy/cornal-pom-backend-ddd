import { BaseAggregateRoot } from '../../domain/entities/base.aggregate-root';
import { BaseUniqueEntityId } from '../../domain/identifier/base.unique-entity.id';
import { RepositoryException } from '../exception/repository.exception';
import { Either } from '../../domain/patterns/result.pattern';

export interface QueryCriteriaInterface {
  filters?: Record<string, unknown>;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}

/**
 * Generic repository interface for aggregates
 * T extends AggregateRoot to ensure repositories only work with aggregates
 */
export interface RepositoryInterface<T extends BaseAggregateRoot<unknown>> {
  /**
   * Find an aggregate by its ID
   */
  findById(id: BaseUniqueEntityId): Promise<Either<RepositoryException, T>>;

  /**
   * Find aggregates by specified criteria
   */
  find(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryException, T[]>>;

  /**
   * Find aggregates and their count
   */
  findAndCount(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryException, [T[], number]>>;

  /**
   * Get total count of aggregates matching criteria
   */
  count(
    criteria?: QueryCriteriaInterface,
  ): Promise<Either<RepositoryException, number>>;

  /**
   * Save an aggregate (create or update)
   */
  save(aggregate: T): Promise<Either<RepositoryException, void>>;

  /**
   * Save multiple aggregates in a single transaction
   */
  saveMany(aggregates: T[]): Promise<Either<RepositoryException, void>>;

  /**
   * Remove an aggregate permanently
   */
  remove(id: BaseUniqueEntityId): Promise<Either<RepositoryException, void>>;

  /**
   * Remove multiple aggregates permanently
   */
  removeMany(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryException, void>>;

  /**
   * Mark an aggregate as deleted without removing it
   * This is a domain concept rather than infrastructure "soft delete"
   */
  markAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryException, void>>;

  /**
   * Mark multiple aggregates as deleted
   */
  markManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryException, void>>;

  /**
   * Restore a deleted aggregate
   */
  unmarkAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryException, void>>;

  /**
   * Restore multiple deleted aggregates
   */
  unmarkManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryException, void>>;

  /**
   * Check if an aggregate exists by ID
   */
  exists(id: BaseUniqueEntityId): Promise<Either<RepositoryException, boolean>>;
}
