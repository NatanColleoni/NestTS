import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, Max, IsInt } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsInt()
  @Max(100)
  age: number;

  @IsEmail()
  email: string;
}