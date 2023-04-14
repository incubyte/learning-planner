import { JwtAuthGuard } from '@/auth/jwt-auth-guard/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagService } from './tag.service';

@UseGuards(JwtAuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/')
  async getAll(): Promise<Tag[]> {
    return this.tagService.getAll();
  }
}
