// src/usuarios/usuarios.service.ts
import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service'; // Ajuste o caminho
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/users.dto';
import { randomInt } from 'crypto';
import * as bcript from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(body: CreateUsuarioDto) {

        if (body.role && body.role === 'SUPERADMIN') {
            throw new BadRequestException(
                'Não é permitido definir o papel como SUPERADMIN.',
            );
        }

        const emailCheck = await this.prismaService.usuario.findUnique({ where: { email: body.email } })

        if (emailCheck)
            throw new HttpException(`Email já cadastrado!`, HttpStatus.CONFLICT);

        const tipoUsuario = await this.prismaService.tipoUsuario.findUnique({ where: { id: body.tipoDeProfissionalId } });

        if (!tipoUsuario) {
            throw new BadRequestException(`Tipo de Profissional com ID "${body.tipoDeProfissionalId}" não encontrado.`);
        }


        let hashPassword: string | null = null;
        let userRole: 'ADMIN' | 'SUPERADMIN' | null = null;
        
        if (body.senha) {
            const costFactor = 12;
            hashPassword = await bcript.hash(body.senha, costFactor);
            userRole = 'ADMIN';
        }
        const user = await this.prismaService.usuario.create({
            data: {
                nome: body.nome,
                email: body.email,
                role: userRole,
                tipoDeProfissionalId: body.tipoDeProfissionalId,
                telefone: body.telefone,
                senha: hashPassword,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
                tipoDeProfissional: true,
                telefone: true
            },
        });

        if (!user) {
            throw new HttpException(
                `Erro ao criar usuário`,
                HttpStatus.EXPECTATION_FAILED,
            );
        }

        return user;
    }

    async findAll() {
        const users = await this.prismaService.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                tipoDeProfissional: true,
                telefone: true,
                role: true,
            }
        });

        if (!users)
            throw new HttpException(`Erro ao encontrar usuários!`, HttpStatus.EXPECTATION_FAILED)

        return users;

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
        
    const user = await this.prismaService.usuario.findUnique({
      where: { email },
    });

    return user;
  }

    async update(id: string, updateDto: UpdateUsuarioDto) {
        await this.findOne(id);

        if (updateDto.senha) {
            const ramdomSalt = randomInt(10, 16);
            updateDto.senha = await bcript.hash(updateDto.senha, ramdomSalt)
        }

        const user = await this.prismaService.usuario.update({
            where: {
                id,
            },
            data: {
                ...updateDto
            }
        });

        if (!user)
            throw new HttpException(`Erro ao atualizar usuário`, HttpStatus.EXPECTATION_FAILED);

        return user;
    }

    async delete(id: string) {
        await this.findOne(id)

        await this.prismaService.usuario.delete({
            where: {
                id,
            }
        });

        return {
            message: 'Usuário deletado com sucesso!',
            status: HttpStatus.NO_CONTENT,
        };

    }
}