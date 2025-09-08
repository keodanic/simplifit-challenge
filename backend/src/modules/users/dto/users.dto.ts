import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    IsOptional,
    IsBoolean,
    IsUUID,
    MaxLength,
    Matches,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger"

enum Role {
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
}

export class CreateUsuarioDto {
    @ApiProperty({ example: 'Nome Teste', description: 'Nome do usuário' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres.' })
    nome: string;

    @ApiProperty({example: 'Email@exemplo.com',description: 'Email do usuário',})
    @IsEmail({}, { message: 'Por favor, forneça um endereço de e-mail válido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email: string;


    @ApiProperty({example: 'passwordexample123',description: 'Senha do Usúario',required: false})
    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    @IsOptional()
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'A senha deve conter ao menos uma letra maiúscula e um número.',
    })
    senha: string;


    @ApiProperty({ example: '5369706e-d791-4ef2-b115-1561920ed739', description: 'Tipo de usuário' })
    @IsUUID('4', { message: 'O ID do tipo de profissional deve ser um UUID válido.' })
    @IsNotEmpty()
    tipoDeProfissionalId: string;

    @ApiProperty({ example: '86999999999', description: 'Telefone do usuário',required: false })
    @IsString()
    @IsOptional()
    telefone?: string;

    @ApiProperty({ example: 'true', description: 'Situação do usuário',required: false })
    @IsBoolean()
    @IsOptional()
    situacao?: boolean;

}

export class UpdateUsuarioDto {

    @ApiProperty({ example: 'Nome Teste', description: 'Nome do usuário' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres.' })
    nome: string;

    @ApiProperty({example: 'passwordexample123',description: 'Senha do Usúario',})
    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'A senha deve conter ao menos uma letra maiúscula e um número.',
    })
    senha: string;

    @ApiProperty({ example: '5369706e-d791-4ef2-b115-1561920ed739', description: 'Tipo de usuário' })
    @IsUUID('4', { message: 'O ID do tipo de profissional deve ser um UUID válido.' })
    @IsNotEmpty()
    tipoDeProfissionalId: string;

    @ApiProperty({ example: '86999999999', description: 'Telefone do usuário',required: false })
    @IsString()
    @IsOptional()
    telefone?: string;

    @ApiProperty({ example: 'true', description: 'Situação do usuário',required: false })
    @IsBoolean()
    @IsOptional()
    situacao?: boolean;

}