import { randomUUID } from 'crypto';
import { BaseUniqueEntityId } from '../identifier/base.unique-entity.id';

export const isEntity = <T>(object: unknown): object is BaseEntity<T> => {
  return object instanceof BaseEntity;
};

export abstract class BaseEntity<T> {
  protected readonly _id: BaseUniqueEntityId;
  public props: T;

  constructor(props: T, id?: BaseUniqueEntityId) {
    this._id = id ? id : new BaseUniqueEntityId(randomUUID());
    this.props = props;
  }

  public get id(): BaseUniqueEntityId {
    return this._id;
  }

  public equals(object: BaseEntity<T>): boolean {
    if (!object) return false;
    if (!isEntity(object)) {
      return false;
    }
    if (this === object) return true;
    return this._id.equals(object._id);
  }
}

export interface BaseEntityProps {
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
