import { Injectable } from '@nestjs/common';
import { Kafka, EachMessagePayload } from 'kafkajs';
import { EventConsumerInterface } from 'src/application/ports/messages/event.consumer.interface';

@Injectable()
export class KafkaConsumerAdapter implements EventConsumerInterface {
  private readonly kafka = new Kafka({
    clientId: 'KAFKA_CLIENT_CONSUMER',
    brokers: ['localhost:9092'],
  });
  private readonly consumer = this.kafka.consumer({ groupId: 'group-service' });

  private readonly topicHandlers = new Map<
    string,
    (data: Record<string, unknown>) => Promise<void>
  >();

  async subscribe(
    topic: string,
    handler: (data: Record<string, unknown>) => Promise<void>,
  ): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    this.topicHandlers.set(topic, handler);
  }

  async run(): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        const handler = this.topicHandlers.get(topic);
        if (handler && message.value) {
          const payload = JSON.parse(message.value.toString());
          await handler(payload);
        }
      },
    });
  }
}
