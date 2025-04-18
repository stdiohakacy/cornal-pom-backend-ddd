import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KafkaPublisherInterface } from 'src/application/ports/messaging/kafka/kafka.publisher.interface';

@Injectable()
export class KafkaPublisherAdapter
  implements KafkaPublisherInterface, OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(KafkaPublisherAdapter.name);
  private readonly kafka = new Kafka({
    clientId: 'app-service',
    brokers: ['localhost:9092'],
  });

  private readonly producer = this.kafka.producer();

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

  async onModuleInit(): Promise<void> {
    await this.producer.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect();
    this.logger.log(`Kafka producer disconnected!`);
  }
}
