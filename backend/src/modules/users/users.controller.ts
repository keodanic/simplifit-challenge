import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/users.dto';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { CheckPolicies } from 'src/guard/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/dto/casl.dto';

@Controller('users')
@UseGuards(PoliciesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    create(@Body() body: CreateUsuarioDto) {
        return this.usersService.create(body)
    }

    @Get()
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    findAll() {
        return this.usersService.findAll()
    }

    @Get(":id")
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.findOne(id)
    }

    @Patch(":id")
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateUsuarioDto) {
        return this.usersService.update(id, body)
    }

    @Delete(':id')
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    delete(@Param('id',ParseUUIDPipe) id: string) {
        return this.usersService.delete(id)
    }

}