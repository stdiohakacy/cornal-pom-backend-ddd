import { BaseRepositoryImpl } from '@shared/infrastructure/mongo/repository/base.repository.impl';
import { AuditLog } from 'src/domain/bounded-context/audit-log/entities/audit-log.entity';
import { AuditLogDocument, AuditLogModel } from '../models/audit-log.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLogRepositoryInterface } from 'src/application/repositories/audit-log/audit-log.repository.interface';
import { Inject } from '@nestjs/common';

export class AuditLogRepositoryImpl
  extends BaseRepositoryImpl<AuditLog, AuditLogDocument>
  implements AuditLogRepositoryInterface
{
  constructor(
    @InjectModel('AuditLog')
    readonly auditLogModel: Model<AuditLogDocument>,
    @Inject(AuditLogModel) readonly auditLogModelClass: AuditLogModel,
  ) {
    super(auditLogModel, auditLogModelClass);
  }
}
