import { UserDecorator } from '@/decorator/user.decorator';
import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { jwtPayload } from '@Auth/jwtpayload/jwt.payload';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { UserService } from '@User/user.service';
import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ProfileCourseDto } from './dto/profileCourse.dto';

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
    @Query('status') status: string,
  ): Promise<ProfileCourseDto> {
    return await this.userService.getCourseByUserId(user.id, status);
  }

  @Patch('/updateProfile')
  async updateProfile(
    @UserDecorator() user: jwtPayload,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateProfile(updatedUser, user.id);
  }
}
