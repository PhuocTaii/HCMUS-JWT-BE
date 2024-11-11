import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/users.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async registerUser(@Body() user: User): Promise<User> {
        try{
            return await this.userService.registerUser(user);
        } catch (error) {
            if(error.message == 'Email already exists'){
                throw new HttpException(
                    'Email already exists',
                    HttpStatus.CONFLICT,
                );
            }
            if(error.message == 'Username already exists'){
                throw new HttpException(
                    'Username already exists',
                    HttpStatus.CONFLICT,
                );            
            }
            if(error.message == 'Email is not valid'){
                throw new HttpException(
                    'Email is not valid',
                    HttpStatus.BAD_REQUEST,
                );            
            }
            if(error.message == 'Username is required'){
                throw new HttpException(
                    'Username is required',
                    HttpStatus.BAD_REQUEST,
                );               
            }
            if(error.message == 'Password is required'){
                throw new HttpException(
                    'Password is required',
                    HttpStatus.BAD_REQUEST,
                );            
            }
            if(error.message == 'Email is required'){
                throw new HttpException(
                    'Email is required',
                    HttpStatus.BAD_REQUEST,
                );            
            }
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        try{
            return this.userService.getProfile(req.user.sub);
        } catch (error){
            if(error.message == 'Unauthorized'){
                throw new HttpException(
                    'Unauthorized',
                    HttpStatus.UNAUTHORIZED,
                );
            }
        }
    }
}
