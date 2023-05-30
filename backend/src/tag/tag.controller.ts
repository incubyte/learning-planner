import { Role } from '@/auth/role.enum';
import { Roles } from '@/decorator/role.decorator';
import { JwtAuthGuard } from '@Auth/jwt-auth-guard/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagService } from '@Tag/tag.service';
import { TagDto } from './dto/tag.dto';

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
  @Roles(Role.Admin)
  @Post('/create')
  async create(@Body() tagDTo: TagDto): Promise<Tag> {
    return await this.tagService.createTag(tagDTo);
  }
}
