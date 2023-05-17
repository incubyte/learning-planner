import { Role } from '@/auth/role.enum';
import { Contains, IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  eid: string;

  @IsNotEmpty()
  role: string;

  clientTeam: string;

  @IsEmail()
  @IsNotEmpty()
  @Contains('@incubyte.co')
  email: string;

  @IsNotEmpty()
  roles: Role;
}
