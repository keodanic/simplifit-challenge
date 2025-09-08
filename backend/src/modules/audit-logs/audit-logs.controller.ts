import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { PoliciesGuard } from '../../guard/policies.guard';
import { CheckPolicies } from '../../guard/policies.check';
import { AppAbility } from '../../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../../casl/dto/casl.dto';

@ApiTags('Auditoria')
@ApiBearerAuth('access-token')
@Controller('audit-logs')
@UseGuards(AuthGuard, PoliciesGuard)
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os logs de auditoria (Apenas SUPERADMIN)' })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Superadmin, 'all'))
  findAll() {
    return this.auditLogsService.findAll();
  }
}