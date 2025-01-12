import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString() // 确保是字符串
  @IsNotEmpty() // 确保不为空
  username: string;

  @IsString() // 确保是字符串
  @IsNotEmpty() // 确保不为空
  password: string;
}