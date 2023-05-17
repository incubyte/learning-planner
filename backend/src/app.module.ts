import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@Auth/auth.module';
import { CourseModule } from '@Course/course.module';
import { PrismaModule } from '@Prisma/prisma.module';
import { TagModule } from '@Tag/tag.module';
import { UserModule } from '@User/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CourseModule,
    TagModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
