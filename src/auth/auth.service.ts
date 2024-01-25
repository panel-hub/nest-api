import { PreconditionFailedException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async signIn(email: string, pass: string) {
        const user = await this.usersService.findOne(email);
        const isMatch = await bcrypt.compare(pass, user?.password);
        if (isMatch) {
            const payload = { sub: user._id, email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
                refresh_token: await this.jwtService.signAsync(payload, { secret: jwtConstants.ref_secret })
            }
        }
        throw new UnauthorizedException();
    }

    async signUp(email: string, pass: string): Promise<any> {
        try {
            const saltOrRounds = 10;
            const password = await bcrypt.hash(pass, saltOrRounds);
            const { password: _password, ...user } = await this.usersService.createUser({ email, password })
            return user
        } catch (error) {
            throw new PreconditionFailedException(error)
        }
    }

    async redifineToken(payload: any) {
        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: await this.jwtService.signAsync(payload, { secret: jwtConstants.ref_secret })
        }
    }
}
