// src/usuarios/usuarios.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/users.dto';
import * as bcrypt from 'bcryptjs'; 

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  
  async create(body: CreateUsuarioDto, operatorId: string) {
    const emailCheck = await this.prismaService.usuario.findUnique({
      where: { email: body.email },
    });

    if (emailCheck) {
      
      throw new ConflictException(`Email já cadastrado!`);
    }

    const tipoUsuario = await this.prismaService.tipoUsuario.findUnique({
      where: { id: body.tipoDeProfissionalId },
    });

    if (!tipoUsuario) {
      throw new BadRequestException(
        `Tipo de Profissional com ID "${body.tipoDeProfissionalId}" não encontrado.`,
      );
    }

    let hashPassword: string | null = null;
    let userRole: 'ADMIN' | 'SUPERADMIN' | null = null;

    if (body.senha) {
      const costFactor = 12;
      hashPassword = await bcrypt.hash(body.senha, costFactor);
      userRole = 'ADMIN';
    }
    const newUser = await this.prismaService.usuario.create({
      data: {
        ...body,
        senha: hashPassword,
        role: userRole,
      },
       include: {
        tipoDeProfissional: true, 
      },
      
    });

    
    await this.prismaService.auditLog.create({
      data: {
        acao: 'CREATE_USER',
        detalhes: {
          message: `Usuário '${newUser.nome}' (ID: ${newUser.id}) foi criado.`,
        },
        realizadoPorId: operatorId,
      },
    });
    

    return newUser;
  }

  async findAll() {

    return this.prismaService.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        tipoDeProfissional: true,
        telefone: true,
        role: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prismaService.usuario.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
   
    return user;
  }

  async findOneByEmailForAuth(email: string) {
    
    return this.prismaService.usuario.findUnique({
      where: { email },
    });
  }

  
  async update(id: string, updateDto: UpdateUsuarioDto, operatorId: string) {
    
    const userBeforeUpdate = await this.prismaService.usuario.findUnique({ where: { id } });
    if (!userBeforeUpdate) {
        throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }

    if (updateDto.senha) {
      const costFactor = 12;
      updateDto.senha = await bcrypt.hash(updateDto.senha, costFactor);
    }

    const updatedUser = await this.prismaService.usuario.update({
      where: { id },
      data: { ...updateDto },
    });

   
     await this.prismaService.auditLog.create({
      data: {
        acao: 'UPDATE_USER',
        detalhes: {
          message: `Usuário '${userBeforeUpdate.nome}' (ID: ${id}) foi atualizado.`,
          
          changes: { ...updateDto }, 
        },
        realizadoPorId: operatorId,
      },
    });
    
    return updatedUser;
  }

 
  async delete(id: string, operatorId: string): Promise<void> {
    const userToDelete = await this.prismaService.usuario.findUnique({ where: { id }});
    if (!userToDelete) {
        throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }

    await this.prismaService.usuario.delete({
      where: { id },
    });

   
    await this.prismaService.auditLog.create({
      data: {
        acao: 'DELETE_USER',
        detalhes: {
          message: `Usuário '${userToDelete.nome}' (ID: ${id}) foi deletado.`,
        },
        realizadoPorId: operatorId,
      },
    });
  }
}