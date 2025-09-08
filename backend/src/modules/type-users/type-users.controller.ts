import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe, 
  HttpCode, 
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TypeUsersService } from './type-users.service';
import { CreateTipoUsuarioDto, UpdateTipoUsuarioDto } from './dto/typeUsers.dto';
import { CheckPolicies } from 'src/guard/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/dto/casl.dto';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('type-users')
@UseGuards(AuthGuard,PoliciesGuard)
export class TypeUsersController {
  constructor(private readonly typeUsersService: TypeUsersService) {}

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Superadmin, 'all'))
  create(@Body() body: CreateTipoUsuarioDto) {
    return this.typeUsersService.create(body);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  findAll() {
    return this.typeUsersService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    
    return this.typeUsersService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Superadmin, 'all'))
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateTipoUsuarioDto) {
    return this.typeUsersService.update(id, body);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Superadmin, 'all'))
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.typeUsersService.delete(id);
  }
}