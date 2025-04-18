export abstract class BaseEvent {
  readonly dateTimeOccurred: Date;
  readonly eventId: string;

  constructor() {
    this.dateTimeOccurred = new Date();
    this.eventId = crypto.randomUUID();
  }

  abstract toJSON(): Record<string, unknown>;
}

export abstract class BaseApplicationEvent extends BaseEvent {
  constructor(
    public readonly eventName: string,
    public readonly eventType: string,
    public readonly eventVersion: number,
    public readonly eventData: unknown,
  ) {
    super();
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

export abstract class BaseIntegrationEvent extends BaseEvent {
  abstract topic(): string;

  toMetadata(): Record<string, unknown> {
    return {
      eventId: this.eventId,
      occurredAt: this.dateTimeOccurred.toISOString(),
      eventType: this.constructor.name,
    };
  }
}
