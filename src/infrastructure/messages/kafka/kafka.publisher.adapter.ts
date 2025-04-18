import { Inject, Injectable, Logger } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { EventPublisherInterface } from 'src/application/ports/messages/event.publisher.interface';
import { KAFKA_PRODUCER } from './kafka.provider';

@Injectable()
export class KafkaPublisherAdapter implements EventPublisherInterface {
  private readonly logger = new Logger(KafkaPublisherAdapter.name);

  constructor(@Inject(KAFKA_PRODUCER) private readonly producer: Producer) {}

  async publish(topic: string, data: Record<string, unknown>): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(data) }],
      });

      this.logger.debug(`Published to [${topic}]: ${JSON.stringify(data)}`);
    } catch (error) {
      this.logger.error(`Failed to publish to Kafka [${topic}]`, error);
    }
  }
}
