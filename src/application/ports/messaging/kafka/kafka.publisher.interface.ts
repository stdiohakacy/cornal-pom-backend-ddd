export const EVENT_PUBLISHER_PORT = Symbol('EVENT_PUBLISHER_PORT');

export interface EventPublisherInterface {
  publish(topic: string, data: Record<string, unknown>): Promise<void>;
}
