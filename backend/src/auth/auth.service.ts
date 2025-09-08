import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service'; // Ajuste o caminho se necessário
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ResponseUserAuthDto } from './dto/authDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: ResponseUserAuthDto }> {
    const user = await this.usersService.findOneByEmailForAuth(email);
    if (!user || !user.senha || !user.role) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const passwordCorrect = await bcrypt.compare(password, user.senha);

    if (!passwordCorrect) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    
    const payload = {
      id: user.id,
      nome:user.nome,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}