import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse() as Response;
        const { access_token, refresh_token } = this.extractTokenFromCookies(request);

        if (!(access_token && refresh_token)) {
            throw new UnauthorizedException();
        }
        
        try {
            const payload = await this.getAccessTokenData(access_token)
            request['user'] = payload;
        } catch (error) {
            try {
                const payload = await this.getRefreshToken(refresh_token)
                const { access_token: _access_token, refresh_token: _refresh_token } = await this.authService.redifineToken(payload)

                response.cookie('access_token', _access_token, { maxAge: 3600000 })
                response.cookie('refresh_token', _refresh_token, { maxAge: 86400000 })
                
                const payload2 = await this.getAccessTokenData(_access_token)

                request['user'] = payload2;
            } catch (error2) {
                response.clearCookie('access_token')
                response.clearCookie('refresh_token')
                throw new UnauthorizedException();
            }
        }
        return true;
    }

    private extractTokenFromCookies(request: Request): { access_token: string, refresh_token: string } {
        const access_token = request.cookies['access_token']
        const refresh_token = request.cookies['refresh_token']
        return { access_token, refresh_token }
    }

    private async getAccessTokenData(token: string) {
        return await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret, maxAge: '1h' });
    }

    private async getRefreshToken(token: string) {
        return await this.jwtService.verifyAsync(token, { secret: jwtConstants.ref_secret, maxAge: '1d' });
    }
}
