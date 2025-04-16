import { Injectable } from '@nestjs/common';
import { AuditLogInterface } from 'src/application/audit-log/audit-log.interface';

@Injectable()
export class ConsoleAuditLogAdapter implements AuditLogInterface {
  async log(action: string, data: Record<string, unknown>): Promise<void> {
    const timestamp = new Date().toISOString();
    console.log(
      `[AUDIT-LOG-CONSOLE][${timestamp}] ${action}:`,
      JSON.stringify(data),
    );
  }
}
