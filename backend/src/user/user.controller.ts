import { Role } from '@/auth/role.enum';
import { RolesGuard } from '@/auth/role.guard';
import { Roles } from '@/decorator/role.decorator';
import { UserDecorator } from '@/decorator/user.decorator';
import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { jwtPayload } from '@Auth/jwtpayload/jwt.payload';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { UserService } from '@User/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User, UserCourse } from '@prisma/client';
import { AddUserDto } from './dto/addUser.dto';
import { courseIdBodyDto } from './dto/courseIdBody.dto';
import { LeaderboardDto } from './dto/leaderboard.dto';
import { ProfileCourseDto } from './dto/profileCourse.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Get('/leaderboard')
  async getLeaderboard(): Promise<LeaderboardDto[]> {
    return await this.userService.getLeaderboard();
  }

  @Post('/course/enroll')
  async enrollCourse(
    @UserDecorator() user: jwtPayload,
    @Body() courseIdBody: courseIdBodyDto,
  ): Promise<UserCourse> {
    return await this.userService.enrollCourse(user.id, courseIdBody.id);
  }

  @Patch('course/completeCourse')
  async completeCourse(
    @UserDecorator() user: jwtPayload,
    @Body() courseIdBody: courseIdBodyDto,
  ): Promise<UserCourse> {
    return await this.userService.completeCourse(user.id, courseIdBody.id);
  }

  @Get('course/status/:courseId')
  async getStatusOfCourse(
    @UserDecorator() user: jwtPayload,
    @Param('courseId') courseId: string,
  ): Promise<number> {
    return await this.userService.getStatusOfCourse(user.id, courseId);
  }

  @Roles(Role.Admin)
  @Post('/add')
  async addUser(@Body() users: AddUserDto[]): Promise<number> {
    return await this.userService.addUser(users);
  }

  @Roles(Role.Admin)
  @Patch('/update/:id')
  async updateUser(
    @Body() user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return await this.userService.updateUser(user, id);
  }

  @Roles(Role.Admin)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }

  @Roles(Role.Admin)
  @Get('/all')
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }
}
