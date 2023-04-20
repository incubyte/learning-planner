import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Course, User } from '@prisma/client';
import { JwtAuthGuard } from '@/auth/jwt-auth-guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Get('course/:userid')
  async getCourseByUserId(@Param('userid') userid: string): Promise<Course[]> {
    return await this.userService.getCourseByUserId(userid);
  }

  @Patch('updateProfile/:userid')
  async updateProfile(
    @Body() updatedUser: UpdateUserDto,
    @Param('userid') userid: string,
  ): Promise<User> {
    return await this.userService.updateProfile(updatedUser, userid);
  }
}
