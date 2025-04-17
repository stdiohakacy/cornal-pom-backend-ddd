import { BaseEvent } from '@shared/events/base.event';

export class ApplicationEvent extends BaseEvent {
  constructor(
    public readonly eventName: string,
    public readonly eventType: string,
    public readonly eventVersion: number,
    public readonly eventData: unknown,
  ) {
    super();
  }

  public static create<T>(
    eventName: string,
    eventType: string,
    eventVersion: number,
    eventData: T,
  ): ApplicationEvent {
    return new this(eventName, eventType, eventVersion, eventData);
  }

  toJSON(): Record<string, unknown> {
    return {
      eventName: this.eventName,
      eventType: this.eventType,
      eventVersion: this.eventVersion,
      eventData: this.eventData,
    };
  }
}
