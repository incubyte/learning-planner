import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Tag[]> {
    return await this.prismaService.tag.findMany();
  }
  getById(id: number): Tag[] | PromiseLike<Tag[]> {
    throw new Error('Method not implemented.');
  }
}
