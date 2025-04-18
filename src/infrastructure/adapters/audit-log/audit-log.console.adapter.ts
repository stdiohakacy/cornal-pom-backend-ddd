import { Injectable } from '@nestjs/common';
import { AuditLogInterface } from 'src/application/ports/audit-log/audit-log.interface';

@Injectable()
export class AuditLogConsoleAdapter implements AuditLogInterface {
  async log(action: string, data: Record<string, unknown>): Promise<void> {
    const timestamp = new Date().toISOString();
    console.log(
      `[AUDIT-CONSOLE][${timestamp}] ${action}:`,
      JSON.stringify(data),
    );
  }
}
