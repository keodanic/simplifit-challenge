import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTipoUsuarioDto } from './dto/typeUsers.dto';
import { UpdateTipoUsuarioDto } from './dto/typeUsers.dto';

@Injectable()
export class TypeUsersService {
    constructor(private readonly prismaService: PrismaService) { }


    async create(body: CreateTipoUsuarioDto) {
        const typeCheck = await this.prismaService.tipoUsuario.findUnique({
            where: {
                descricao: body.descricao
            }
        })
        if (typeCheck)
            throw new HttpException(`Tipo de usuário já cadastrado!`, HttpStatus.CONFLICT);

        const typeUser = await this.prismaService.tipoUsuario.create(
            {
                data: body,
                select: {
                    id: true,
                    descricao: true,
                    situacao: true

                }
            }
        )
        if (!typeUser) {
            throw new HttpException(
                "Erro ao criar o tipo de usuário", HttpStatus.EXPECTATION_FAILED
            )
        }
        return typeUser

    }

    async findAll() {
        const typeUser = await this.prismaService.tipoUsuario.findMany({
            select: {
                id: true,
                descricao: true,
                situacao: true
            }
        });

        if (!typeUser)
            throw new HttpException(`Erro ao encontrar os tipos d usuários!`, HttpStatus.EXPECTATION_FAILED)

        return typeUser;
    }

    async findOne(id: string) {
        const typeUser = await this.prismaService.tipoUsuario.findUnique({
            where: {
                id
            }
        });

        if (!typeUser)
            throw new HttpException(`Erro ao encontrar tipo de usuário`, HttpStatus.EXPECTATION_FAILED)

        return typeUser;
    }

    
     async update(id: string, body: UpdateTipoUsuarioDto) {
        await this.findOne(id)
        const typeUser = await this.prismaService.tipoUsuario.update({
            where: {
                id,
            },
            data: {
                ...body
            }
        });

        if (!typeUser)
            throw new HttpException(`Erro ao atualizar tipo de usuário`, HttpStatus.EXPECTATION_FAILED);

        return typeUser;
    }



    async delete(id: string) {
        await this.findOne(id)

        await this.prismaService.tipoUsuario.delete({
            where: {
                id,
            }
        });

        return {
            message: 'Tipo de Usuário deletado com sucesso!',
            status: HttpStatus.NO_CONTENT,
        };
}
}