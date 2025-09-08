import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateTipoUsuarioDto {

    @ApiProperty({example: 'Professor',description: 'Descrição do tipo de usuário (ex: Professor, Aluno, Diretor).',})
    @IsString({ message: 'A descrição deve ser um texto.' })
    @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
    descricao: string;

    @ApiProperty({example: true,description: 'Define se o tipo de usuário está ativo (true) ou inativo (false). O padrão é true.',required: false})
    @IsBoolean({ message: 'A situação deve ser um valor booleano (true ou false).' })
    @IsOptional()
    situacao?: boolean;
}

export class UpdateTipoUsuarioDto {
    @ApiProperty({example: 'Professor',description: 'Descrição do tipo de usuário (ex: Professor, Aluno, Diretor).',})
    @IsString({ message: 'A descrição deve ser um texto.' })
    @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
    descricao: string;

    @ApiProperty({example: true,description: 'Define se o tipo de usuário está ativo (true) ou inativo (false). O padrão é true.',required: false})
    @IsBoolean({ message: 'A situação deve ser um valor booleano (true ou false).' })
    @IsOptional()
    situacao?: boolean;
}