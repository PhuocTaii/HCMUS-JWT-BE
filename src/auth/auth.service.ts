import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schema/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ){}

    async login(email: string, password: string): Promise<any> {
        if(email === ''){
            throw new Error('Email is required');
        }
        if(password === ''){
            throw new Error('Password is required');
        }

        const user = await this.userModel.findOne({email: email});

        if (!user) {
            throw new Error('Email does not exist');
        }

        if(!await bcrypt.compare(password, user.password.toString())){
            throw new Error('Password is incorrect');
        }

        const payload = { sub: user._id, email: user.email };

        console.log(payload);
        
        return {
            user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
