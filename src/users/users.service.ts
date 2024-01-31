import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findOne(email: string) {
        return await this.userModel.findOne({ email });
    }

    async createUser(user: User) {
        return await (await this.userModel.create(user)).toObject({ minimize: true })
    }

    async getRoles(email: string) {
        try {
            const user = await this.userModel.findOne({ email })
            const userWithRole = await user.populate('role')
            const roles = []
            for (const role in userWithRole.role.roles) {
                roles.push(...userWithRole.role.roles[role].map(e => [role, e].join('.')))
            }
            return roles
        } catch (error) {
            return []
        }
    }
}
