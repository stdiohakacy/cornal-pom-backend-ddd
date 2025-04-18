export const AUDIT_LOG_PORT = Symbol('AUDIT_LOG_PORT');
export interface AuditLogInterface {
  log(action: string, data: Record<string, unknown>): Promise<void>;
}
