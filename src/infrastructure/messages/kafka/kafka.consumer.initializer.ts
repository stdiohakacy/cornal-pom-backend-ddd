import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerAdapter } from './kafka.consumer.adapter';

@Injectable()
export class KafkaConsumerInitializer implements OnModuleInit {
  constructor(private readonly kafkaConsumer: KafkaConsumerAdapter) {}

  async onModuleInit() {
    await this.kafkaConsumer.subscribe('group.created', async (data) => {
      console.log('Received event:', data);
    });

    await this.kafkaConsumer.run();
  }
}
