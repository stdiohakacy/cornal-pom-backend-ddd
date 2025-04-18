import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryImpl } from '@shared/infrastructure/typeorm/repository/base.repository.impl';
import { DataSource, Repository } from 'typeorm';
import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';
import { GroupEntityOrm } from '../entities/group.entity-orm';
import { GroupRepositoryInterface } from 'src/application/ports/repositories/group/group.repository.interface';
import { GROUP_SCHEMA } from '../schemas/group.schema';
import { GroupInfrastructureMapper } from '../mappers/group.infrastructure.mapper';
import { Either, left, right } from '@shared/domain/patterns/result.pattern';
import { RepositoryError } from '@shared/errors/infrastructure.error';
import { GroupMemberEntityOrm } from '../entities/group-member.entity-orm';
import { GroupToPersistenceBuilder } from '../mappers/builders/to-persistence/group.to-persistence.builder';

export class GroupRepositoryImpl
  extends BaseRepositoryImpl<Group, GroupEntityOrm>
  implements GroupRepositoryInterface
{
  constructor(
    @InjectRepository(GroupEntityOrm)
    readonly groupRepository: Repository<GroupEntityOrm>,
    private readonly dataSource: DataSource,
  ) {
    super(groupRepository, GROUP_SCHEMA, GroupInfrastructureMapper);
  }

  async save(group: Group): Promise<Either<RepositoryError, void>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const builder = new GroupToPersistenceBuilder().fromDomain(group);
      const groupEntityOrm: GroupEntityOrm = builder.build();
      const memberEntitiesOrm: GroupMemberEntityOrm[] =
        builder.getGroupMembersPersistence();

      await queryRunner.manager.save(GroupEntityOrm, groupEntityOrm);

      for (const member of memberEntitiesOrm) {
        member.group = groupEntityOrm;
        await queryRunner.manager.save(GroupMemberEntityOrm, member);
      }

      await queryRunner.commitTransaction();
      return right(undefined);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return left(
        new RepositoryError(
          `[${GROUP_SCHEMA.TABLE_NAME}] Save failed`,
          error,
          'GroupRepositoryImpl.save',
        ),
      );
    } finally {
      await queryRunner.release();
    }
  }
}
