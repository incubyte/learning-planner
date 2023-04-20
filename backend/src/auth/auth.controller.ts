import { AuthService } from '@Auth/auth.service';
import { UserDto } from '@Auth/dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() user: UserDto): Promise<User> {
    const res = await this.authService.signup(user);
    return res;
  }

  @Post('/signin')
  async signin(@Body() user: UserDto): Promise<string> {
    return await this.authService.signin(user);
  }
}
