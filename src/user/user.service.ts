import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async addRoleToUser(userId: number, roleName: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    const role = await this.rolesRepository.findOne({
      where: { name: roleName },
    });
    if (user && role) {
      user.roles.push(role);
      await this.usersRepository.save(user);
    }
  }

  findOneWithRoles(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async findOneWithRolesAndPermissions(userId: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
