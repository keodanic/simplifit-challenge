import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    UseGuards,
    Req, 
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/users.dto';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { CheckPolicies } from 'src/guard/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/dto/casl.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Usuários')
@Controller('users')
@UseGuards(AuthGuard, PoliciesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Criar um novo usuário (Operador ou Membro)' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos ou tipo de profissional não encontrado.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão insuficiente.' })
    @ApiResponse({ status: 409, description: 'E-mail já cadastrado.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    create(@Body() body: CreateUsuarioDto, @Req() req) { 
        const operatorId = req.user.id; 
        return this.usersService.create(body, operatorId); 
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão insuficiente.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: 'Buscar um usuário específico pelo ID' })
    @ApiResponse({ status: 200, description: 'Dados do usuário retornados com sucesso.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão insuficiente.' })
    @ApiResponse({ status: 404, description: 'Usuário com o ID fornecido não encontrado.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(":id")
    @ApiOperation({ summary: 'Atualizar os dados de um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados de atualização inválidos.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão insuficiente.' })
    @ApiResponse({ status: 404, description: 'Usuário com o ID fornecido não encontrado.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateUsuarioDto, @Req() req) { 
        const operatorId = req.user.id; 
        return this.usersService.update(id, body, operatorId); 
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Deletar um usuário pelo ID' })
    @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão insuficiente.' })
    @ApiResponse({ status: 404, description: 'Usuário com o ID fornecido não encontrado.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    delete(@Param('id', ParseUUIDPipe) id: string, @Req() req) { 
        const operatorId = req.user.id; 
        return this.usersService.delete(id, operatorId); 
    }
}