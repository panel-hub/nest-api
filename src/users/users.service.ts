import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findOne(email: string) {
        return this.userModel.findOne({ email });
    }

    async createUser(user: User) {
        return await (await this.userModel.create(user)).toObject({ minimize: true })
    }
}
