import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DRoles } from 'src/decorator/roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @DRoles(['roles.read', 'roles.add'])
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  @DRoles(['roles.read'])
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  @DRoles(['roles.read'])
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(id);
  }

  @Patch(':id')
  @DRoles(['roles.read', 'roles.update'])
  async update(@Body('_id') id: UpdateRoleDto['_id'], @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @DRoles(['roles.read', 'roles.delete'])
  async remove(@Body('_id') id: UpdateRoleDto['_id']) {
    return await this.rolesService.remove(id);
  }
}
