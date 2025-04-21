import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
