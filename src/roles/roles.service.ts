import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/schema/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) { }

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleModel.create(createRoleDto);
  }

  async findAll() {
    return await this.roleModel.find();
  }

  async findOne(id: string) {
    return await this.roleModel.findById(id);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.roleModel.findByIdAndUpdate(id, { $set: updateRoleDto });
  }

  async remove(id: string) {
    return await this.roleModel.findByIdAndDelete(id);
  }
}
