import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './Dto/userDto';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() user: UserDto) {
    const res = await this.authService.signup(user);
    return res;
  }

  @Post('/signin')
  async signin(@Body() user: UserDto) {
    return this.authService.signin(user);
  }
}
