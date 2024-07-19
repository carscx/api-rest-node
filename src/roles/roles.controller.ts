import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('manage_roles')
  @Post(':roleId/permissions')
  async addPermissionToRole(
    @Param('roleId') roleId: number,
    @Body('permission') permissionName: string,
  ) {
    return this.rolesService.addPermissionToRole(roleId, permissionName);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('manage_roles')
  @Post(':roleId/remove-permissions')
  async removePermissionFromRole(
    @Param('roleId') roleId: number,
    @Body('permission') permissionName: string,
  ) {
    return this.rolesService.removePermissionFromRole(roleId, permissionName);
  }
}
