import { User } from 'src/user/entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserDto {
  id: number;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
  }
}
