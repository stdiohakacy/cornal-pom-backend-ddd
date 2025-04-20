import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import { CASSANDRA_CLIENT } from '../cassandra.provider';

@Injectable()
export class GroupReadModelMigrationService implements OnModuleInit {
  private readonly logger = new Logger(GroupReadModelMigrationService.name);
  constructor(@Inject(CASSANDRA_CLIENT) private readonly client: Client) {}

  async onModuleInit(): Promise<void> {
    await this.createGroupsByIdTable();
  }

  private async createGroupsByIdTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS pom_read_model.groups_by_id (
        id UUID PRIMARY KEY,
        name TEXT,
        description TEXT,
        creator_id UUID,
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        deleted_at TIMESTAMP
      );
    `;

    try {
      await this.client.execute(query);
      this.logger.log('groups_by_id table migration completed.');
    } catch (err) {
      this.logger.error('Failed to create groups_by_id table', err);
    }
  }
}
