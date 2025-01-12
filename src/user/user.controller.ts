import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res) {
    const user = await this.userService.createUser(createUserDto.username, createUserDto.password);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res) {
    const user = await this.userService.validateUser(loginUserDto.username, loginUserDto.password);
    if (user) {
      const token = await this.authService.login(user);
      return res.status(HttpStatus.OK).json(token);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: '用户名或密码错误！' });
    }
  }
}