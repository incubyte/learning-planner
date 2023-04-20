import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';

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
}
