import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Tag[]> {
    throw new NotImplementedException();
  }
}
