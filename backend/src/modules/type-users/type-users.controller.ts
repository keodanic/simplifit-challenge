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
    Req, // NOVO: Importa o decorador Req
} from '@nestjs/common';
import { TypeUsersService } from './type-users.service';
import { CreateTipoUsuarioDto, UpdateTipoUsuarioDto } from './dto/typeUsers.dto';
import { CheckPolicies } from 'src/guard/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/dto/casl.dto';
import { PoliciesGuard } from 'src/guard/policies.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de Usuário')
@Controller('type-users')
@UseGuards(AuthGuard, PoliciesGuard)
export class TypeUsersController {
    constructor(private readonly typeUsersService: TypeUsersService) { }

    @Post()
    @ApiOperation({ summary: 'Criar um novo tipo de usuário (Apenas SUPERADMIN)' })
    @ApiResponse({ status: 201, description: 'Tipo de usuário criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão de SUPERADMIN necessária.' })
    @ApiResponse({ status: 409, description: 'Um tipo de usuário com esta descrição já existe.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Superadmin, 'all'))
    create(@Body() body: CreateTipoUsuarioDto, @Req() req) { 
        const operatorId = req.user.id; 
        return this.typeUsersService.create(body, operatorId); 
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os tipos de usuário (Apenas ADMINS ou SUPERADMINS)' })
    @ApiResponse({ status: 200, description: 'Lista de tipos de usuário retornada com sucesso.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão de ADMIN necessária.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    findAll() {
        return this.typeUsersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar um tipo de usuário pelo ID (Apenas ADMINS ou SUPERADMINS)' })
    @ApiResponse({ status: 200, description: 'Dados do tipo de usuário retornados com sucesso.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão de ADMIN necessária.' })
    @ApiResponse({ status: 404, description: 'Tipo de usuário com o ID fornecido não encontrado.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.typeUsersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar um tipo de usuário (Apenas SUPERADMIN)' })
    @ApiResponse({ status: 200, description: 'Tipo de usuário atualizado com sucesso.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão de SUPERADMIN necessária.' })
    @ApiResponse({ status: 404, description: 'Tipo de usuário com o ID fornecido não encontrado.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Superadmin, 'all'))
    update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateTipoUsuarioDto, @Req() req) { 
        const operatorId = req.user.id; 
        return this.typeUsersService.update(id, body, operatorId); 
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um tipo de usuário (Apenas SUPERADMIN)' })
    @ApiResponse({ status: 204, description: 'Tipo de usuário deletado com sucesso.' })
    @ApiResponse({ status: 403, description: 'Acesso negado. Permissão de SUPERADMIN necessária.' })
    @ApiResponse({ status: 404, description: 'Tipo de usuário com o ID fornecido não encontrado.' })
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Superadmin, 'all'))
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) { 
        const operatorId = req.user.id; 
        return this.typeUsersService.delete(id, operatorId); 
    }
}