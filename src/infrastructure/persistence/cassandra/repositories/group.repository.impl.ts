import { Inject, Injectable } from '@nestjs/common';
import { BaseCassandraRepositoryImpl } from '@shared/infrastructure/cassandra/repository/base.repository.impl';
import { Group } from 'src/domain/bounded-context/group/aggregates/group.aggregate';
import { GroupReadModel, GroupReadRow } from '../models/group.model';
import { GroupRepositoryInterface } from 'src/application/ports/repositories/group/group.repository.interface';
import { Client } from 'cassandra-driver';
import { CASSANDRA_CLIENT } from '../cassandra.provider';

@Injectable()
export class GroupReadRepositoryImpl
  extends BaseCassandraRepositoryImpl<Group, GroupReadRow>
  implements GroupRepositoryInterface
{
  constructor(
    @Inject(CASSANDRA_CLIENT)
    client: Client,
    readonly model: GroupReadModel,
  ) {
    super(client, 'group_read_model', model);
  }
}
