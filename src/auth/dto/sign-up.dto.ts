import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(4)
  password: string;
}
