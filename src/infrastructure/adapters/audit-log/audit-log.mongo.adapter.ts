import { Inject, Injectable } from '@nestjs/common';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import { AuditLogInterface } from 'src/application/audit-log/audit-log.interface';
import {
  AUDIT_LOG_REPOSITORY_PORT,
  AuditLogRepositoryInterface,
} from 'src/application/repositories/audit-log/audit-log.repository.interface';
import { AuditLog } from 'src/domain/bounded-context/audit-log/entities/audit-log.entity';

@Injectable()
export class AuditLogMongoAdapter implements AuditLogInterface {
  constructor(
    @Inject(AUDIT_LOG_REPOSITORY_PORT)
    private readonly auditLogRepository: AuditLogRepositoryInterface,
  ) {}
  async log(action: string, data: Record<string, unknown>): Promise<void> {
    const { actor = 'system', context = 'default', ...payload } = data;

    const auditLog = AuditLog.create(
      {
        action,
        actor: String(actor),
        context: String(context),
        payload,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
      new BaseUniqueEntityId(),
    );

    const saveResult = await this.auditLogRepository.save(auditLog);
    if (saveResult.isLeft()) {
      console.error(
        `[AuditLog] Failed to save audit log: ${saveResult.value.message}`,
      );
    }
  }
}
