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
import { Model } from 'mongoose';
import { BaseMongoModel } from '../model/base.model';

export abstract class BaseRepositoryImpl<
  TDomain extends BaseEntity<BaseEntityProps>,
  TPersistence,
> implements RepositoryInterface<TDomain>
{
  constructor(
    protected readonly collection: Model<TPersistence>,
    protected readonly model: BaseMongoModel<TDomain, TPersistence>,
  ) {}

  async find(): Promise<Either<RepositoryError, TDomain[]>> {
    try {
      const docs = await this.collection.find().lean();
      const results = docs.map((doc) =>
        this.model.toDomain(doc as TPersistence),
      );
      return right(results);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] Find failed`, error));
    }
  }

  async findAndCount(): Promise<Either<RepositoryError, [TDomain[], number]>> {
    try {
      const docs = await this.collection.find().lean();
      const count = await this.collection.countDocuments();
      const results = docs.map((doc) =>
        this.model.toDomain(doc as TPersistence),
      );
      return right([results, count]);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] FindAndCount failed`, error));
    }
  }

  async count(): Promise<Either<RepositoryError, number>> {
    try {
      const count = await this.collection.countDocuments();
      return right(count);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] Count failed`, error));
    }
  }

  async save(entity: TDomain): Promise<Either<RepositoryError, void>> {
    try {
      const doc = this.model.toPersistence(entity);
      await new this.collection(doc).save();
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] Save failed`, error));
    }
  }

  async saveMany(entities: TDomain[]): Promise<Either<RepositoryError, void>> {
    try {
      const docs = entities.map((e) => this.model.toPersistence(e));
      await this.collection.insertMany(docs);
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] SaveMany failed`, error));
    }
  }

  async remove(id: BaseUniqueEntityId): Promise<Either<RepositoryError, void>> {
    try {
      await this.collection.deleteOne({ id: id.toString() } as any);
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] Remove failed`, error));
    }
  }

  async removeMany(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    try {
      const strIds = ids.map((id) => id.toString());
      await this.collection.deleteMany({ id: { $in: strIds } } as any);
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] RemoveMany failed`, error));
    }
  }

  async markAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>> {
    try {
      await this.collection.updateOne({ id: id.toString() } as any, {
        $set: { deletedAt: new Date() },
      });
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] MarkAsDeleted failed`, error));
    }
  }

  async markManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    try {
      const strIds = ids.map((id) => id.toString());
      await this.collection.updateMany({ id: { $in: strIds } } as any, {
        $set: { deletedAt: new Date() },
      });
      return right(undefined);
    } catch (error) {
      return left(
        new RepositoryError(`[Mongo] MarkManyAsDeleted failed`, error),
      );
    }
  }

  async unmarkAsDeleted(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, void>> {
    try {
      await this.collection.updateOne({ id: id.toString() } as any, {
        $unset: { deletedAt: '' },
      });
      return right(undefined);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] UnmarkAsDeleted failed`, error));
    }
  }

  async unmarkManyAsDeleted(
    ids: BaseUniqueEntityId[],
  ): Promise<Either<RepositoryError, void>> {
    try {
      const strIds = ids.map((id) => id.toString());
      await this.collection.updateMany({ id: { $in: strIds } } as any, {
        $unset: { deletedAt: '' },
      });
      return right(undefined);
    } catch (error) {
      return left(
        new RepositoryError(`[Mongo] UnmarkManyAsDeleted failed`, error),
      );
    }
  }

  async exists(
    id: BaseUniqueEntityId,
  ): Promise<Either<RepositoryError, boolean>> {
    try {
      const found = await this.collection.exists({ id: id.toString() } as any);
      return right(!!found);
    } catch (error) {
      return left(new RepositoryError(`[Mongo] Exists failed`, error));
    }
  }
}
