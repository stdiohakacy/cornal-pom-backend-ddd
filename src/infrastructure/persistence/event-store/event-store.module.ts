import { EventStoreDBClient } from '@eventstore/db-client';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: EventStoreDBClient,
      useFactory: () =>
        EventStoreDBClient.connectionString`esdb://localhost:2113?tls=false`,
    },
  ],
  exports: [EventStoreDBClient],
})
export class EventStoreModule {}
