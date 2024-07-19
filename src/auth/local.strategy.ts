import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from '../common/response.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private responseService: ResponseService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(
        this.responseService.unauthorized().message,
      );
    }
    return user;
  }
}
