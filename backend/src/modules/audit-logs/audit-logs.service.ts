import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.auditLog.findMany({
      orderBy: {
        timestamp: 'desc', 
      },
      include: {
        
        realizadoPor: {
          select: {
            nome: true,
          },
        },
      },
    });
  }
}