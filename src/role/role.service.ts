import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    console.log('Creating role:', role);
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.roleRepository.find();
    console.log('Fetched roles:', roles);
    return roles;
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      console.log(`Role with id ${id} not found`);
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    console.log(`Found role:`, role);
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    const updated = Object.assign(role, updateRoleDto);
    console.log(`Updating role ID ${id} with:`, updateRoleDto);
    return this.roleRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    console.log(`Deleting role:`, role);
    await this.roleRepository.remove(role);
  }
}
