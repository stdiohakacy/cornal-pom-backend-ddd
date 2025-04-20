// cassandra.provider.ts
import { Provider } from '@nestjs/common';
import { Client } from 'cassandra-driver';

export const CASSANDRA_CLIENT = Symbol('CASSANDRA_CLIENT');
export const CassandraClientProvider: Provider = {
  provide: CASSANDRA_CLIENT,
  useFactory: async () => {
    const client = new Client({
      contactPoints: ['localhost'],
      localDataCenter: 'dc1',
      keyspace: 'pom_read_model',
      credentials: {
        username: 'cassandra',
        password: 'cassandra',
      },
      queryOptions: {
        prepare: true,
      },
    });
    await client.connect();
    return client;
  },
};
