import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseService } from '../common/response.service';
import { createValidationExceptionFactory } from '../common/validation-exception-factory';
import { PermissionsGuard } from './permissions.guard';
import { Permissions } from './permissions.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private responseService: ResponseService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return this.responseService.success(result, 'Login successful');
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const validationPipe = new ValidationPipe({
      exceptionFactory: createValidationExceptionFactory(this.responseService),
    });

    await validationPipe.transform(createUserDto, {
      type: 'body',
      metatype: CreateUserDto,
    });

    const result = await this.authService.register(createUserDto);
    return this.responseService.created(result, 'Registration successful');
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    const result = await this.authService.refresh(req.user);
    return this.responseService.success(result, 'Token refreshed successfully');
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('can_access_protected_route')
  @Post('protected')
  async getProtected(@Request() req) {
    return this.responseService.success(
      req.user,
      'Access granted to protected route',
    );
  }
}
