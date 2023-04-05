import { AppService } from '@/app.service';
import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
