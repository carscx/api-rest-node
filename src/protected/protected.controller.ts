import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
