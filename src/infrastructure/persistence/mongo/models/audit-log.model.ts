import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';
import {
  BaseMongoModel,
  BaseMongoModelProps,
} from '@shared/infrastructure/mongo/model/base.model';
import { AuditLog } from 'src/domain/bounded-context/audit-log/entities/audit-log.entity';

export interface AuditLogDocument extends BaseMongoModelProps {
  id: string;
  action: string;
  actor: string;
  context: string;
  payload: Record<string, unknown>;
}

export class AuditLogModel extends BaseMongoModel<AuditLog, AuditLogDocument> {
  toPersistence(entity: AuditLog): AuditLogDocument {
    return {
      id: entity.id.toString(),
      action: entity.action,
      actor: entity.actor,
      context: entity.context,
      payload: entity.payload,
      createdAt: entity.props.createdAt,
      updatedAt: entity.props.updatedAt,
      deletedAt: entity.props.deletedAt,
    };
  }

  toDomain(raw: AuditLogDocument): AuditLog {
    const auditLog = AuditLog.create(
      {
        action: raw.action,
        actor: raw.actor,
        context: raw.context,
        payload: raw.payload,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new BaseUniqueEntityId(raw.id),
    );

    return auditLog;
  }
}
