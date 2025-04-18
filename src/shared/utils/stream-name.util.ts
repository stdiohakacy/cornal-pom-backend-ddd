/**
 * Utility to generate consistent stream names for EventStoreDB.
 * Supports naming conventions like:
 * - aggregateType-aggregateId (e.g., group-12345)
 * - $ce-aggregateType (e.g., $ce-group) for category subscriptions
 */

export class StreamName {
  /**
   * Creates a stream name from aggregate type and ID.
   * @param aggregateType The type of aggregate, e.g. 'group', 'user'
   * @param aggregateId UUID or identifier
   * @returns e.g. `group-1be22567-34ff-4fad-9b98-1640d4cdc7e1`
   */
  public static forAggregate(
    aggregateType: string,
    aggregateId: string,
  ): string {
    return `${aggregateType}-${aggregateId}`;
  }

  /**
   * Creates a category stream name for projections.
   * Used for subscriptions to all events of an aggregate type.
   * @param aggregateType The type of aggregate
   * @returns e.g. `$ce-group`
   */
  public static forCategory(aggregateType: string): string {
    return `$ce-${aggregateType}`;
  }

  /**
   * Parses a stream name and extracts the aggregate type and ID.
   * @param streamName The stream name, e.g. 'group-abc123'
   * @returns { aggregateType, aggregateId } or null if invalid
   */
  public static parse(
    streamName: string,
  ): { aggregateType: string; aggregateId: string } | null {
    const parts = streamName.split('-');
    if (parts.length < 2) return null;

    const aggregateType = parts[0];
    const aggregateId = parts.slice(1).join('-'); // in case UUID contains `-`
    return { aggregateType, aggregateId };
  }

  /**
   * Generates a stream name for an aggregate type and ID.
   * @param aggregateType The type of aggregate, e.g. 'group', 'user'
   * @param aggregateId UUID or identifier
   * @returns e.g. `group-1be22567-34ff-4fad-9b98-1640d4cdc7e1`
   */
}
