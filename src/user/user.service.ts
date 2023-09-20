import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UserDto } from './dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import config from 'src/config/config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(CreateUserDto: CreateUserDto): Promise<User> {
    const { email, password } = CreateUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    const saved_user = await this.userRepository.save(user);
    delete saved_user.password;
    return saved_user;
  }

  async login(loginDto: LoginUserDto): Promise<{ jwt: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { id: user.id };
    const jwt = this.jwtService.sign(payload, {
      secret: config.jwtSecret,
    });
    return { jwt };
  }

  async getUserProfileFromJwt(jwtToken: string): Promise<UserDto | null> {
    try {
      const decoded = this.jwtService.verify(jwtToken, {
        secret: config.jwtSecret,
      });
      console.log({ decoded });
      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });
      const userProfile: UserDto = {
        id: user.id,
        email: user.email,
      };
      return userProfile;
    } catch (error) {
      return null;
    }
  }
}
