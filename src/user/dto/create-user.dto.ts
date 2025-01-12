import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString() // 确保是字符串
  @IsNotEmpty() // 确保不为空
  username: string;

  @IsString() // 确保是字符串
  @IsNotEmpty() // 确保不为空
  @MinLength(6) // 密码至少 6 位
  password: string;
}