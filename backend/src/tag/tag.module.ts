import { Module } from '@nestjs/common';
import { TagController } from '@Tag/tag.controller';
import { TagService } from '@Tag/tag.service';

@Module({
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
