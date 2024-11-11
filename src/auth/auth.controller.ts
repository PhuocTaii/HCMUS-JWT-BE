import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { log } from 'console';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: Record<string, string>): Promise<any> {
        try{
            return await this.authService.login(loginDto.email, loginDto.password);
        } catch(error){
            if(error.message == 'Email is required'){
                throw new HttpException(
                    'Email is required',
                    HttpStatus.BAD_REQUEST,
                );            
            }
            if(error.message == 'Password is required'){
                throw new HttpException(
                    'Password is required',
                    HttpStatus.BAD_REQUEST,
                );            
            }
            if(error.message == 'Email does not exist'){
                throw new HttpException(
                    'Email does not exist',
                    HttpStatus.NOT_FOUND,
                );            
            }
            if(error.message == 'Password is incorrect'){
                throw new HttpException(
                    'Password is incorrect',
                    HttpStatus.UNAUTHORIZED,
                );
            }
        }
    }
}
