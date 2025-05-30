import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('[CREATE] Recibiendo DTO:', createUserDto);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    console.log('[CREATE] Contraseña hasheada');

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const saved = await this.userRepository.save(newUser);
    console.log('[CREATE] Usuario guardado:', saved);
    return saved;
  }

  findAll() {
    console.log('[FIND ALL] Obteniendo todos los usuarios');
    return this.userRepository.find();
  }

  findOne(id: number) {
    console.log(`[FIND ONE] Buscando usuario con id: ${id}`);
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(`[UPDATE] Actualizando usuario con id: ${id}`);
    if (updateUserDto.password) {
      console.log('[UPDATE] Detectada contraseña para actualizar, hasheando...');
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
      console.log('[UPDATE] Contraseña hasheada');
    }

    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });
    console.log('[UPDATE] Usuario actualizado:', updatedUser);
    return updatedUser;
  }

  async remove(id: number) {
    console.log(`[REMOVE] Eliminando usuario con id: ${id}`);
    await this.userRepository.delete(id);
    console.log('[REMOVE] Usuario eliminado');
    return { message: 'Usuario eliminado' };
  }

  async findByEmail(email: string) {
    console.log('[UsersService] Buscando usuario por email:', email);
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      console.log('[UsersService] Usuario encontrado:', user);
    } else {
      console.log('[UsersService] No se encontró usuario con ese email');
    }
    return user;
  }
}
