import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @Matches('^[a-zA-Z0-9+_.-]+@[incubyte.co]+$',"",{"message":"Email Id should be an Incubyte Email-Id. "})
  email: string;

  @IsNotEmpty()
  password: string;
}