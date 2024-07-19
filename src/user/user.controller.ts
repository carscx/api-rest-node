import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('manage_roles')
  @Post(':userId/roles')
  async addRoleToUser(
    @Param('userId') userId: number,
    @Body('role') roleName: string,
  ) {
    await this.userService.addRoleToUser(userId, roleName);
    return { message: 'Role assigned successfully' };
  }
}
