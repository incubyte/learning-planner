import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '@Auth/Dto/user.dto';
import { AuthService } from '@Auth/auth.service';

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
