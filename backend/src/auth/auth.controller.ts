import { AuthService } from '@Auth/auth.service';
import { UserDto } from '@Auth/dto/user.dto';
import { Body, Controller, Param, Post } from '@nestjs/common';
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

  @Post('/admin/signin')
  async signinAdmin(@Body() user: UserDto): Promise<string> {
    return await this.authService.signinAdmin(user);
  }

  @Post('/admin/forgotPassword')
  async forgotPasswordAdmin(@Body('email') useremail: string): Promise<string> {
    return await this.authService.forgotPasswordAdmin(useremail);
  }

  @Post('/admin/resetPassword/:token')
  async resetPasswordAdmin(
    @Param('token') token: string,
    @Body('password') userpassword: string,
  ): Promise<string> {
    return await this.authService.resetPasswordAdmin(token, userpassword);
  }

  @Post('/forgotPassword')
  async forgotPassword(@Body('email') useremail: string): Promise<string> {
    return await this.authService.forgotPassword(useremail);
  }
}
