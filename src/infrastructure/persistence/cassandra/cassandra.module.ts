import { Module } from '@nestjs/common';
import { CassandraClientProvider } from './cassandra.provider';
import { GroupReadModelMigrationService } from './migrations/group.read.model.migration';

@Module({
  providers: [CassandraClientProvider, GroupReadModelMigrationService],
  exports: [CassandraClientProvider],
})
export class CassandraModule {}
