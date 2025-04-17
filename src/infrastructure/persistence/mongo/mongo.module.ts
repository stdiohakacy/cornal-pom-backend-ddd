import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLogSchema } from './schemas/audit-log.schema';
import { AuditLogModel } from './models/audit-log.model';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:admin1234A@localhost:27017/?authSource=admin',
    ),

    MongooseModule.forFeature([{ name: 'AuditLog', schema: AuditLogSchema }]),
  ],
  providers: [AuditLogModel],
  exports: [AuditLogModel, MongooseModule],
})
export class MongoModule {}
