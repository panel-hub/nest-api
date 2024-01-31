import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import { DUser } from 'src/decorator/user.decorator';
import { User } from 'src/schema/user.schema';
import { DRoles } from 'src/decorator/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>, @Res({ passthrough: true }) response: Response) {
      const { access_token, refresh_token } = await this.authService.signIn(signInDto.email, signInDto.password);
      response.cookie('access_token', access_token, { maxAge: 3600000 })
      response.cookie('refresh_token', refresh_token, { maxAge: 86400000 })
      return { access_token, refresh_token }
    }  

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async signUp(@Body() signInDto: Record<string, any>) {
      return await this.authService.signUp(signInDto.email, signInDto.password);
    }  

    @Get('profile')
    @DRoles(['products.read'])
    getProfile(@DUser() user: User) {
      return user;
    }
}
