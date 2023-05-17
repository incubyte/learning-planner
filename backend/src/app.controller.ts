import { AppService } from '@/app.service';
import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from './auth/role.enum';
import { RolesGuard } from './auth/role.guard';
import { Roles } from './decorator/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles(Role.Admin)
  @Get('/r')
  get(): string {
    return this.appService.getHello();
  }
}
