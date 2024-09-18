import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraer el token de la cabecera Authorization: Bearer
            ignoreExpiration: false, // El token será inválido si está expirado
            secretOrKey: 'a1b2c3d4e5f6g7h8', // Mismo secreto usado para firmar el token
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
