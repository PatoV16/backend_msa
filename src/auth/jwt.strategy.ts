import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt_secret_key', // ⚠️ Usa variable de entorno en producción
    });
  }

  async validate(payload: any) {
    // Este método define lo que se inyectará como "user" en los controladores protegidos
    return { userId: payload.sub, email: payload.email };
  }
}
