import { PrismaService } from '@Prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Tag[]> {
    return await this.prismaService.tag.findMany();
  }

  async getById(id: string): Promise<Tag> {
    const intId = Number.parseInt(id);
    return await this.prismaService.tag.findFirst({ where: { id: intId } });
  }

  async createTag(tag: TagDto): Promise<Tag> {
    const prismaTag = await this.prismaService.tag.findFirst({
      where: { name: tag.name },
    });
    if (prismaTag) {
      throw new BadRequestException('Tag already exist');
    }
    const createTag = await this.prismaService.tag.create({
      data: { name: tag.name },
    });
    return createTag;
  }

  async updateTag(id: number, tagBody: TagDto): Promise<Tag> {
    const prismaUpdateTag = await this.prismaService.tag.findFirst({
      where: { id: id },
    });

    if (!prismaUpdateTag) {
      throw new BadRequestException('Tag does not exists');
    }

    const updateTagResponse = await this.prismaService.tag.update({
      where: { id: id },
      data: { ...tagBody },
    });

    return updateTagResponse;
  }

  async deleteTag(id: number): Promise<string> {
    const prismadeleteTag = await this.prismaService.tag.findFirst({
      where: { id: id },
    });

    if (!prismadeleteTag) {
      throw new BadRequestException('Tag does not exists');
    }

    const deleteTagResponse = await this.prismaService.tag.delete({
      where: { id: id },
    });
    if (!deleteTagResponse) {
      throw new BadRequestException('Some problem occured');
    }
    return 'Tag deleted Successfully';
  }
}
