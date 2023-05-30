import { PrismaService } from '@Prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  createTag(tagDTo: TagDto): Tag | PromiseLike<Tag> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Tag[]> {
    return await this.prismaService.tag.findMany();
  }
  async getById(id: string): Promise<Tag> {
    const intId = Number.parseInt(id);
    return await this.prismaService.tag.findFirst({ where: { id: intId } });
  }
}
