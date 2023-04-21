import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Course, User } from '@prisma/client';
import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { jwtPayload } from '@Auth/jwtpayload/jwt.payload';
import { UserDecorator } from '@/decorator/user.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUserById(@UserDecorator() user: jwtPayload): Promise<User> {
    return await this.userService.getUserById(user.id);
  }

  @Get('/course')
  async getCourseByUserId(
    @UserDecorator() user: jwtPayload,
  ): Promise<Course[]> {
    return await this.userService.getCourseByUserId(user.id);
  }

  @Patch('/updateProfile')
  async updateProfile(
    @UserDecorator() user: jwtPayload,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateProfile(updatedUser, user.id);
  }
}
