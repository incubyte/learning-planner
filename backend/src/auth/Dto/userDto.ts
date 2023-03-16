import { IsEmail, IsNotEmpty, Contains } from 'class-validator';

export class UserDto{

    @IsEmail()
    @IsNotEmpty()
    @Contains('incubyte')
    email :string

    @IsNotEmpty()
    password: string
}