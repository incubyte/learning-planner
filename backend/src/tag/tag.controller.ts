import { Controller, Get } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/')
  async getAll(): Promise<Tag[]> {
    return this.tagService.getAll();
  }
}
