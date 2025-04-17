export abstract class BaseEvent {
  readonly dateTimeOccurred: Date;
  readonly eventId: string;

  constructor() {
    this.dateTimeOccurred = new Date();
    this.eventId = crypto.randomUUID();
  }

  abstract toJSON(): Record<string, unknown>;
}
