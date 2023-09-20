import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UserDto } from './dto/create-user.dto';
import { extractJwtToken } from 'src/utilities/utility';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUser: CreateUserDto) {
    const user = await this.userService.register(createUser);
    return { user };
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginDto: LoginUserDto,
  ): Promise<{ jwt: string }> {
    const jwt = await this.userService.login(loginDto);
    return jwt;
  }

  @Get('user')
  async getUserProfile(
    @Headers('authorization') authorization: string,
  ): Promise<UserDto> {
    const jwtToken = extractJwtToken(authorization);

    const userProfile = await this.userService.getUserProfileFromJwt(jwtToken);
    if (!userProfile) {
      throw new HttpException('Invalid JWT token', HttpStatus.UNAUTHORIZED);
    }

    return userProfile;
  }
}
