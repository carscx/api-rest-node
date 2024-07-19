import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from '../permissions/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: ['permissions'] });
  }

  findOne(id: number): Promise<Role> {
    return this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  create(role: Role): Promise<Role> {
    return this.rolesRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }

  async addPermissionToRole(
    roleId: number,
    permissionName: string,
  ): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    const permission = await this.permissionsRepository.findOne({
      where: { name: permissionName },
    });

    if (role && permission) {
      role.permissions.push(permission);
      return this.rolesRepository.save(role);
    }

    throw new Error('Role or Permission not found');
  }

  async removePermissionFromRole(
    roleId: number,
    permissionName: string,
  ): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    const permission = await this.permissionsRepository.findOne({
      where: { name: permissionName },
    });

    if (role && permission) {
      role.permissions = role.permissions.filter(
        (perm) => perm.id !== permission.id,
      );
      return this.rolesRepository.save(role);
    }

    throw new Error('Role or Permission not found');
  }
}
