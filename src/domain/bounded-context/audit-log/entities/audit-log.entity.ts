import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/base.entity';
import { BaseUniqueEntityId } from '@shared/domain/identifier/base.unique-entity.id';

export interface AuditLogProps extends BaseEntityProps {
  action: string;
  actor: string;
  context: string;
  payload: Record<string, unknown>;
}

export class AuditLog extends BaseEntity<AuditLogProps> {
  get action(): string {
    return this.props.action;
  }

  get actor(): string {
    return this.props.actor;
  }

  get context(): string {
    return this.props.context;
  }

  get payload(): Record<string, any> {
    return this.props.payload;
  }

  static create(props: AuditLogProps, id?: BaseUniqueEntityId) {
    return new AuditLog(props, id);
  }
}
