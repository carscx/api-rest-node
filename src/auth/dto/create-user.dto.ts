import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Lastname is required' })
  lastname: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
