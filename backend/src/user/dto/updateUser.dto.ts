import { Role } from '@/auth/role.enum';

export class UpdateUserDto {
  eId: string;
  role: string;
  clientTeam: string;
  projectTeam: string;
  email: string;
  roles: Role;
  profilePhoto: string;
}
