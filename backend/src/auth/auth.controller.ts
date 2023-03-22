import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@Auth/auth.service';
import { UserDto } from './Dto/user.dto';

@Controller('/auth')
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
