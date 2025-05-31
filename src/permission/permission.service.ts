import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(createDto);
    console.log('Creating permission:', permission);
    return this.permissionRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    const list = await this.permissionRepository.find();
    console.log('Fetched permissions:', list);
    return list;
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id } });
    if (!permission) {
      console.log(`Permission with id ${id} not found`);
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    console.log('Found permission:', permission);
    return permission;
  }

  async update(id: number, updateDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);
    console.log(`Updating permission ID ${id} with:`, updateDto);
    Object.assign(permission, updateDto);
    return this.permissionRepository.save(permission);
  }

  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id);
    console.log('Removing permission:', permission);
    await this.permissionRepository.remove(permission);
  }
}
