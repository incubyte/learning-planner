import { UserDecorator } from '@/decorator/user.decorator';
import { AuthService } from '@Auth/auth.service';
import { UserDto } from '@Auth/dto/user.dto';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AzureADAuthGuard } from './azure-ad/aad-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() user: UserDto): Promise<User> {
    const res = await this.authService.signup(user);
    return res;
  }

  @UseGuards(AzureADAuthGuard)
  @Post('/signin')
  async signin(@UserDecorator() user: any): Promise<string> {
    return await this.authService.signin(user);
  }

  @UseGuards(AzureADAuthGuard)
  @Post('/admin/signin')
  async signinAdmin(@UserDecorator() user: any): Promise<string> {
    return await this.authService.signinAdmin(user);
  }

  @Post('/admin/forgotPassword')
  async forgotPasswordAdmin(@Body('email') useremail: string): Promise<string> {
    return await this.authService.forgotPasswordAdmin(useremail);
  }

  @Post('/resetPassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') userpassword: string,
  ): Promise<string> {
    return await this.authService.resetPassword(token, userpassword);
  }

  @Post('/forgotPassword')
  async forgotPassword(@Body('email') useremail: string): Promise<string> {
    return await this.authService.forgotPassword(useremail);
  }
}
