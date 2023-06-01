import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { AddUserDto } from './addUser.dto';

export class AddUserBodyDto {
  @IsNotEmpty()
  @Type(() => AddUserDto)
  @ValidateNested({ each: true })
  users: AddUserDto[];
}
