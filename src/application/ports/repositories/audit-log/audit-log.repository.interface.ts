import { RepositoryInterface } from '@shared/application/repository.interface';
import { AuditLog } from 'src/domain/bounded-context/audit-log/entities/audit-log.entity';

export const AUDIT_LOG_REPOSITORY_PORT = Symbol('AUDIT_LOG_REPOSITORY_PORT');
export interface AuditLogRepositoryInterface
  extends RepositoryInterface<AuditLog> {}
