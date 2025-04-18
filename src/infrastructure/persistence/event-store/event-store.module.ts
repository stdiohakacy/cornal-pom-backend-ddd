import { EventStoreDBClient } from '@eventstore/db-client';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: EventStoreDBClient,
      useFactory: () =>
        EventStoreDBClient.connectionString`esdb://localhost:2113?tls=false`,
    },
    // {
    //   provide: EVENT_STORE_PUBLISHER_PORT,
    //   useClass: EventStoreDBPublisher,
    // },
  ],
  exports: [EventStoreDBClient],
})
export class EventStoreModule {}
