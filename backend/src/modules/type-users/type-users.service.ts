import {
  ConflictException, 
  Injectable,
  NotFoundException, 
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTipoUsuarioDto } from './dto/typeUsers.dto';
import { UpdateTipoUsuarioDto } from './dto/typeUsers.dto';

@Injectable()
export class TypeUsersService {
  constructor(private readonly prismaService: PrismaService) {}

  
  async create(body: CreateTipoUsuarioDto, operatorId: string) {
    const typeCheck = await this.prismaService.tipoUsuario.findUnique({
      where: {
        descricao: body.descricao,
      },
    });
    if (typeCheck) {
      
      throw new ConflictException(`Tipo de usuário já cadastrado!`);
    }

    const newTypeUser = await this.prismaService.tipoUsuario.create({
      data: body,
     
    });

    
    await this.prismaService.auditLog.create({
        data: {
            acao: 'CREATE_TYPE_USER',
            detalhes: {
                message: `Tipo de usuário '${newTypeUser.descricao}' (ID: ${newTypeUser.id}) foi criado.`
            },
            realizadoPorId: operatorId
        }
    });

    return newTypeUser;
  }

  async findAll() {
    
    return this.prismaService.tipoUsuario.findMany({
      select: {
        id: true,
        descricao: true,
        situacao: true,
      },
    });
  }

  async findOne(id: string) {
    const typeUser = await this.prismaService.tipoUsuario.findUnique({
      where: {
        id,
      },
    });

    if (!typeUser) {
      
      throw new NotFoundException(`Tipo de usuário com ID "${id}" não encontrado.`);
    }

    return typeUser;
  }

  
  async update(id: string, body: UpdateTipoUsuarioDto, operatorId: string) {
    
    const typeUserBeforeUpdate = await this.findOne(id);

    const updatedTypeUser = await this.prismaService.tipoUsuario.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });

    
    await this.prismaService.auditLog.create({
        data: {
            acao: 'UPDATE_TYPE_USER',
            detalhes: {
                message: `Tipo de usuário '${typeUserBeforeUpdate.descricao}' (ID: ${id}) foi atualizado.`,
                changes: { ...body }
            },
            realizadoPorId: operatorId
        }
    });

    return updatedTypeUser;
  }

 
  async delete(id: string, operatorId: string): Promise<void> {
    
    const typeUserToDelete = await this.findOne(id);

    await this.prismaService.tipoUsuario.delete({
      where: {
        id,
      },
    });

    
    await this.prismaService.auditLog.create({
        data: {
            acao: 'DELETE_TYPE_USER',
            detalhes: {
                message: `Tipo de usuário '${typeUserToDelete.descricao}' (ID: ${id}) foi deletado.`
            },
            realizadoPorId: operatorId
        }
    });
  }
}