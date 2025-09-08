import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {

  @ApiProperty({example: 'fulano@example.com',description: 'O Email do usuário',})
  @IsEmail()
  @IsNotEmpty({ message: 'Digite um email válido!' })
  email: string;
  

  @ApiProperty({ example: 'secret', description: 'A senha do usuário.' })
  @IsNotEmpty({ message: 'Digite uma senha!' })
  password: string;
}

export class ResponseUserAuthDto {

  @ApiProperty({ example: '82704273-d483-423a-1234-9b5b8447568a', description: 'Id do usuário'})
  @IsNotEmpty()
  id: string;

  @ApiProperty({example: 'fulano@example.com',description: 'O Email do usuário',})
  @IsNotEmpty({ message: 'Insira seu email' })
  email: string;

  @ApiProperty({ example: 'ADMIN', description: 'Papel do usuário' })
  @IsNotEmpty({ message: 'Insira seu papel' })
  role: Role;
}