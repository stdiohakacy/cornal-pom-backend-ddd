import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import {
  BaseCassandraModelProps,
  BaseModelCassandra,
} from '@shared/infrastructure/cassandra/model/base.model';
import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';

export interface GroupReadRow extends BaseCassandraModelProps {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
}

export class GroupReadModel extends BaseModelCassandra<Group, GroupReadRow> {
  toPersistence(entity: Group): GroupReadRow {
    return {
      id: entity.id.toString(),
      name: entity.name,
      creator_id: entity.creatorId.toString(),
      description: entity.description,
      created_at: entity.props.createdAt,
      updated_at: entity.props.updatedAt,
      deleted_at: entity.props.deletedAt,
    };
  }

  toDomain(raw: GroupReadRow): Group {
    return Group.create(
      {
        name: raw.name,
        description: raw.description,
        creatorId: new BaseUniqueEntityId(raw.creator_id),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        deletedAt: raw.deleted_at,
      },
      new BaseUniqueEntityId(raw.id),
    ).getValue();
  }
}
