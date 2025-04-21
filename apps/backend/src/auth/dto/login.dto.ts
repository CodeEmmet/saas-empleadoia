import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
