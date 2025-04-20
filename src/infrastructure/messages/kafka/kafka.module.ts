import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { KafkaProducerProvider, KAFKA_PRODUCER } from './kafka.provider';
import { KafkaPublisherAdapter } from './kafka.publisher.adapter';
import { EVENT_PUBLISHER_PORT } from 'src/application/ports/messages/event.publisher.interface';
import { KafkaConsumerAdapter } from './kafka.consumer.adapter';
import { EVENT_CONSUMER_PORT } from 'src/application/ports/messages/event.consumer.interface';
import { KafkaConsumerInitializer } from './kafka.consumer.initializer';

@Module({
  providers: [
    KafkaProducerProvider,
    KafkaPublisherAdapter,
    KafkaConsumerAdapter,
    {
      provide: EVENT_PUBLISHER_PORT,
      useClass: KafkaPublisherAdapter,
    },
    {
      provide: EVENT_CONSUMER_PORT,
      useClass: KafkaConsumerAdapter,
    },
    KafkaConsumerInitializer,
  ],
  exports: [EVENT_PUBLISHER_PORT, EVENT_CONSUMER_PORT],
})
export class KafkaModule implements OnModuleDestroy {
  constructor(@Inject(KAFKA_PRODUCER) private readonly producer: Producer) {}

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
