export const KAFKA_PUBLISHER_PORT = Symbol('KAFKA_PUBLISHER_PORT');

export interface KafkaPublisherInterface {
  publish(topic: string, data: Record<string, unknown>): Promise<void>;
}
