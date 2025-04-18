import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { KafkaProducerProvider, KAFKA_PRODUCER } from './kafka.provider';
import { KafkaPublisherAdapter } from './kafka.publisher.adapter';
import { EVENT_PUBLISHER_PORT } from 'src/application/ports/messages/event.publisher.interface';
import { Producer } from 'kafkajs';

@Module({
  providers: [
    KafkaProducerProvider,
    KafkaPublisherAdapter,
    {
      provide: EVENT_PUBLISHER_PORT,
      useClass: KafkaPublisherAdapter,
    },
  ],
  exports: [EVENT_PUBLISHER_PORT],
})
export class KafkaModule implements OnModuleDestroy {
  constructor(@Inject(KAFKA_PRODUCER) private readonly producer: Producer) {}

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
