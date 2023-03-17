import { Contains, IsEmail, IsNotEmpty} from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @Contains('@incubyte.co')
  email: string;

  @IsNotEmpty()
  password: string;
}