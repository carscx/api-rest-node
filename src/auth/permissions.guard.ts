import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userWithRolesAndPermissions =
      await this.userService.findOneWithRolesAndPermissions(user.id);

    return requiredPermissions.some((permission) =>
      userWithRolesAndPermissions.roles.some((role) =>
        role.permissions.some((perm) => perm.name === permission),
      ),
    );
  }
}
