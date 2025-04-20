export const EVENT_CONSUMER_PORT = Symbol('EVENT_CONSUMER_PORT');

export interface EventConsumerInterface {
  subscribe(
    topic: string,
    handler: (payload: Record<string, unknown>) => Promise<void>,
  ): Promise<void>;
  run(): Promise<void>;
}
