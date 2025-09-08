import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from "@prisma/client";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Digite um email válido!' })
  email: string;
  
  @IsNotEmpty({ message: 'Digite uma senha!' })
  password: string;
}

export class ResponseUserAuthDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty({ message: 'Insira seu email' })
  email: string;

  @IsNotEmpty({ message: 'Insira seu papel' })
  role: Role;
}