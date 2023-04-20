import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Course, User } from '@prisma/client';
import { JwtAuthGuard } from '@/auth/jwt-auth-guard/jwt-auth.guard';

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
}
