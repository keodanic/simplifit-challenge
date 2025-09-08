import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateTipoUsuarioDto {
    @IsString({ message: 'A descrição deve ser um texto.' })
    @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
    descricao: string;

    @IsBoolean({ message: 'A situação deve ser um valor booleano (true ou false).' })
    @IsOptional()
    situacao?: boolean;
}

export class UpdateTipoUsuarioDto {
    @IsString({ message: 'A descrição deve ser um texto.' })
    @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
    descricao: string;

    @IsBoolean({ message: 'A situação deve ser um valor booleano (true ou false).' })
    @IsOptional()
    situacao?: boolean;
}