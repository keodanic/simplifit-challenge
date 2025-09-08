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

enum Role {
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
}

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres.' })
    nome: string;

    @IsEmail({}, { message: 'Por favor, forneça um endereço de e-mail válido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    @IsOptional()
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'A senha deve conter ao menos uma letra maiúscula e um número.',
    })
    senha: string;

    @IsUUID('4', { message: 'O ID do tipo de profissional deve ser um UUID válido.' })
    @IsNotEmpty()
    tipoDeProfissionalId: string;

    @IsString()
    @IsOptional()
    telefone?: string;

    @IsBoolean()
    @IsOptional()
    situacao?: boolean;

     role: Role;
}

export class UpdateUsuarioDto {
   @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres.' })
    nome: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'A senha deve conter ao menos uma letra maiúscula e um número.',
    })
    senha: string;

    @IsUUID('4', { message: 'O ID do tipo de profissional deve ser um UUID válido.' })
    @IsNotEmpty()
    tipoDeProfissionalId: string;

    @IsString()
    @IsOptional()
    telefone?: string;

    @IsBoolean()
    @IsOptional()
    situacao?: boolean;

    role: Role;
}
