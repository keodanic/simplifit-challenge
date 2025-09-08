import { Module } from '@nestjs/common';
import { AuditLogsController } from './audit-logs.controller';
import { AuditLogsService } from './audit-logs.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AuditLogsController],
  providers: [AuditLogsService,PrismaService]
})
export class AuditLogsModule {}
