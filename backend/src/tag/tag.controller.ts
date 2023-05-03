import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagService } from '@Tag/tag.service';

@UseGuards(JwtAuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/')
  async getAll(): Promise<Tag[]> {
    return await this.tagService.getAll();
  }
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Tag> {
    return await this.tagService.getById(id);
  }
}
