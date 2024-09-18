import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/argentina/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async generateToken(data: LoginDto): Promise<any> {
        if (data.username !== 'testClient') return 'Usuario invalido';
        if (data.password !== 'P@ssw0rd123!') return 'password invalido';

        const expireIn = 15 * 60 * 1000;

        const token = await this.jwtService.sign({username: 'testClient', password: 'P@ssw0rd123!'});

        return { token, expireIn };
    }
}
