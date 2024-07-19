import { Controller, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserRolesController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/roles')
  async addRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('roleName') roleName: string,
  ) {
    await this.userService.addRoleToUser(userId, roleName);
    return { message: 'Role added to user successfully' };
  }
}
