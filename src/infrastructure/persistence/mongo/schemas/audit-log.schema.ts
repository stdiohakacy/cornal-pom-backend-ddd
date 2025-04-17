import { Schema } from 'mongoose';

export const AuditLogSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    action: { type: String, required: true },
    actor: { type: String },
    context: { type: String, required: true },
    payload: { type: Object },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
  },
  { collection: 'audit_logs' },
);
