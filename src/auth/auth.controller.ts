import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('[AuthController] Login attempt with email:', body.email);

    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      console.log('[AuthController] Usuario no validado, credenciales inválidas');
      throw new UnauthorizedException('Credenciales inválidas');
    }

    console.log('[AuthController] Usuario validado, generando token JWT...');
    const loginResponse = await this.authService.login(user);
    console.log('[AuthController] Token generado:', loginResponse);

    return loginResponse;
  }
}
