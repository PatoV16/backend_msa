import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log('[AuthService] Validando usuario con email:', email);
    const user = await this.usersService.findByEmail(email);
    if (user) {
      console.log('[AuthService] Usuario encontrado, comparando contraseñas...');
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        console.log('[AuthService] Contraseña correcta');
        const { password, ...result } = user;
        return result;
      } else {
        console.log('[AuthService] Contraseña incorrecta');
      }
    } else {
      console.log('[AuthService] Usuario no encontrado');
    }
    return null;
  }

  async login(user: any) {
    console.log('[AuthService] Generando token JWT para:', user.email);
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('[AuthService] Token generado:', token);
    return {
      access_token: token,
    };
  }
}
