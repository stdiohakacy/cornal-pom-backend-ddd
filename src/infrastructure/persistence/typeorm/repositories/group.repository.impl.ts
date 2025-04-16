import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryImpl } from '@shared/infrastructure/typeorm/repository/repository.impl';
import { Repository } from 'typeorm';
import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';
import { GroupEntityOrm } from '../entities/group.entity-orm';
import { GroupRepositoryInterface } from 'src/application/repositories/group/group.repository.interface';
import { GROUP_SCHEMA } from '../schemas/group.schema';
import { GroupInfrastructureMapper } from '../mappers/group.infrastructure.mapper';

export class GroupRepositoryImpl
  extends BaseRepositoryImpl<Group, GroupEntityOrm>
  implements GroupRepositoryInterface
{
  constructor(
    @InjectRepository(GroupEntityOrm)
    readonly groupRepository: Repository<GroupEntityOrm>,
  ) {
    super(groupRepository, GROUP_SCHEMA, GroupInfrastructureMapper);
  }
}
