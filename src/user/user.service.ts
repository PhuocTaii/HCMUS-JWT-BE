import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './schema/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
    ) {}
    async registerUser(user: User): Promise<any> {
        const salt = await bcrypt.genSalt(10); 
        
        const hashedPassword = await bcrypt.hash(user.password.toString(), salt);
        
        user.password = hashedPassword;

        // xu ly trung email
        if (await this.userModel.findOne({email: user.email}) != null) {
            throw new Error('Email already exists');
        }
        //xu ly trung username
        if (await this.userModel.findOne({username: user.username}) != null) {
            throw new Error('Username already exists');
        }

        //xu ly email khong dung format
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.toString())){
            throw new Error('Email is invalid');
        }

        //xu ly bo trong username
        if(user.username === ''){
            throw new Error('Username is required');
        }

        //xu ly bo trong password
        if(user.password === ''){
            throw new Error('Password is required');
        }

        //xu ly bo trong email
        if(user.email === ''){
            throw new Error('Email is required');
        }

        return await this.userModel.create(user)
    }

    async getProfile(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }
}
