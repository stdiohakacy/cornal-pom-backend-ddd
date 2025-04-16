import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';
import { GroupEntityOrm } from '../entities/group.entity-orm';
import { GroupToDomainBuilder } from './builders/to-domain/group.to-domain.builder';
import { GroupToPersistenceBuilder } from './builders/to-persistence/group.to-persistence.builder';

export class GroupInfrastructureMapper {
  public static toDomain(groupEntityOrm: GroupEntityOrm): Group {
    return new GroupToDomainBuilder(groupEntityOrm).build();
  }

  public static toPersistence(group: Group): GroupEntityOrm {
    return new GroupToPersistenceBuilder().fromDomain(group).build();
  }
}
