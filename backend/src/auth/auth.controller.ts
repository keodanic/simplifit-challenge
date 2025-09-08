import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authDto.dto';
import { Public } from './skipAuth/skip.auth';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  singIn(@Body() body: AuthDto) {
    return this.authService.signIn(body.email, body.password);
  }
}