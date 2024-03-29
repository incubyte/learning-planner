import { CourseService } from '@Course/course.service';
import { CourseDto } from '@Course/dto/course.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Course } from '@prisma/client';
import { updateCourseDto } from './dto/updateCourse.dto';

describe('CourseService', () => {
  let service: CourseService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useFactory() {
            return {
              course: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
              },
              userCourse: {
                groupBy: jest.fn(),
              },
              courseTag: {
                groupBy: jest.fn(),
                createMany: jest.fn(),
                deleteMany: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();
    service = module.get<CourseService>(CourseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Courses', () => {
    it('should return all courses', async () => {
      const courses: CourseDto[] = [
        {
          name: 'Day 1 clean code kata',
          resourseUrls: [
            'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
          ],
          testUrls: [''],
          imageUrl:
            'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
          credit: 10,
          description: 'description',
        },
        {
          name: 'Day 2 clean code and refactoring',
          resourseUrls: [
            'https://web.microsoftstream.com/video/387a80e2-d57b-4111-9185-c0812cc6c574',
          ],
          testUrls: [''],
          imageUrl:
            'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
          credit: 10,
          description: 'description',
        },
      ];
      const mockResponse = [];
      mockResponse.push(
        {
          id: '1',
          name: courses[0].name,
          resourseUrls: courses[0].resourseUrls,
          testUrls: courses[0].testUrls,
          imageUrl: courses[0].imageUrl,
          credit: courses[0].credit,
          description: courses[0].description,
          createdAt: Date.prototype,
          updatedAt: Date.prototype,
        },
        {
          id: '2',
          name: courses[1].name,
          resourseUrls: courses[1].resourseUrls,
          testUrls: courses[1].testUrls,
          imageUrl: courses[1].imageUrl,
          credit: courses[1].credit,
          description: courses[1].description,
          createdAt: Date.prototype,
          updatedAt: Date.prototype,
        },
      );

      jest
        .spyOn(prismaService.course, 'findMany')
        .mockResolvedValue(mockResponse);
      const result = await service.getAll();
      expect(prismaService.course.findMany).toBeCalledTimes(1);
      expect(result).toMatchObject(mockResponse);
    });

    it('should return course by id which is provided', async () => {
      const courses: CourseDto = {
        name: 'Day 1 clean code kata',
        resourseUrls: [
          'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
        ],
        testUrls: [''],
        imageUrl:
          'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
        credit: 10,
        description: 'description',
      };
      const mockResponse = {
        id: '1',
        name: courses.name,
        resourseUrls: courses.resourseUrls,
        testUrls: courses.testUrls,
        imageUrl: courses.imageUrl,
        credit: courses.credit,
        description: courses.description,
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };

      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValue(mockResponse);
      const result = await service.getById('1');
      expect(prismaService.course.findFirst).toBeCalledTimes(1);
      expect(result).toMatchObject(mockResponse);
    });

    it('should filter courses by tags', async () => {
      const courses: CourseDto[] = [
        {
          name: 'Day 1 clean code kata',
          resourseUrls: [
            'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
          ],
          testUrls: [''],
          imageUrl:
            'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
          credit: 10,
          description: 'description',
        },
        {
          name: 'Day 2 clean code and refactoring',
          resourseUrls: [
            'https://web.microsoftstream.com/video/387a80e2-d57b-4111-9185-c0812cc6c574',
          ],
          testUrls: [''],
          imageUrl:
            'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
          credit: 10,
          description: 'description',
        },
      ];
      const mockResponse: any[] = [];
      mockResponse.push({
        id: '2',
        name: courses[1].name,
        resourseUrls: courses[1].resourseUrls,
        testUrls: courses[1].testUrls,
        imageUrl: courses[1].imageUrl,
        credit: courses[1].credit,
        description: courses[1].description,
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      });
      const tags = [];
      const mockTagCourse: any = [
        {
          courseId: '1',
        },
        {
          courseId: '2',
        },
      ];
      tags.push('refactoring', 'clean-code');
      jest
        .spyOn(prismaService.course, 'findMany')
        .mockResolvedValue(mockResponse);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore

      jest
        .spyOn(prismaService.courseTag, 'groupBy')
        .mockResolvedValue(mockTagCourse);
      const result = await service.filterByTags(tags);
      expect(prismaService.courseTag.groupBy).toBeCalledTimes(1);
      expect(prismaService.course.findMany).toBeCalledTimes(1);
      expect(result).toMatchObject(mockResponse);
    });
  
    it('should filter popular course by tags', async () => {
      const courses: CourseDto[] = [
        {
          name: 'Day 1 clean code kata',
          resourseUrls: [
            'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
          ],
          testUrls: [''],
          imageUrl:
            'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
          credit: 10,
          description: 'description',
        },
        {
          name: 'Day 2 clean code and refactoring',
          resourseUrls: [
            'https://web.microsoftstream.com/video/387a80e2-d57b-4111-9185-c0812cc6c574',
          ],
          testUrls: [''],
          imageUrl:
            'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
          credit: 10,
          description: 'description',
        },
      ];

      const mockResponse = [];
      mockResponse.push(
        {
          id: '1',
          name: courses[0].name,
          resourseUrls: courses[0].resourseUrls,
          testUrls: courses[0].testUrls,
          imageUrl: courses[0].imageUrl,
          credit: courses[0].credit,
          description: courses[0].description,
          createdAt: Date.prototype,
          updatedAt: Date.prototype,
        },
        {
          id: '2',
          name: courses[1].name,
          resourseUrls: courses[1].resourseUrls,
          testUrls: courses[1].testUrls,
          imageUrl: courses[1].imageUrl,
          credit: courses[1].credit,
          description: courses[1].description,
          createdAt: Date.prototype,
          updatedAt: Date.prototype,
        },
      );

      const mockTagCourse: any = [
        {
          courseId: '1',
        },
        {
          courseId: '2',
        },
      ];
      const mockUserCourse: any = [
        {
          _count: { courseId: 7 },
          courseId: '1',
        },
        {
          _count: { courseId: 6 },
          courseId: '2',
        },
      ];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      jest
        .spyOn(prismaService.userCourse, 'groupBy')
        .mockResolvedValueOnce(mockUserCourse);

      jest
        .spyOn(prismaService.course, 'findMany')
        .mockResolvedValueOnce(mockResponse);
        
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest
        .spyOn(prismaService.courseTag, 'groupBy')
        .mockResolvedValueOnce(mockTagCourse);

      const course = await service.getPopularCourse();
      expect(course).toEqual(mockResponse);
    });

    it('should return popular course', async () => {
      const courses: CourseDto[] = [
        {
          name: 'Day 1 clean code kata',
          resourseUrls: [
            'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
          ],
          testUrls: [''],
          imageUrl:
            'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
          credit: 10,
          description: 'description',
        },
        {
          name: 'Day 2 clean code and refactoring',
          resourseUrls: [
            'https://web.microsoftstream.com/video/387a80e2-d57b-4111-9185-c0812cc6c574',
          ],
          testUrls: [''],
          imageUrl:
            'https://in.images.search.yahoo.com/images/view;_ylt=Awr1SSiRTy1kb4cLLsq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzQyZTY0MDk5ZDU4ZTA0NjIxZGIyOTFiMzFhNjU3YmIxBGdwb3MDMjAEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dclean%2Bcode%26type%3DE211IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D20&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2F4LUNr4AeLZM%2Fmaxresdefault.jpg&rurl=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D4LUNr4AeLZM&size=138.8KB&p=clean+code&oid=42e64099d58e04621db291b31a657bb1&fr2=piv-web&fr=mcafee&tt=Clean+Code%21+-+YouTube&b=0&ni=21&no=20&ts=&tab=organic&sigr=BwBZBBbiDgZS&sigb=N4X2keUrYF9q&sigi=E7Tff6GG25xa&sigt=NZfjbeVtrurr&.crumb=AVdd1qPlDGC&fr=mcafee&fr2=piv-web&type=E211IN826G0',
          credit: 10,
          description: 'description',
        },
      ];

      const mockResponse = [];
      mockResponse.push(
        {
          id: '1',
          name: courses[0].name,
          resourseUrls: courses[0].resourseUrls,
          testUrls: courses[0].testUrls,
          imageUrl: courses[0].imageUrl,
          credit: courses[0].credit,
          description: courses[0].description,
          createdAt: Date.prototype,
          updatedAt: Date.prototype,
        },
        {
          id: '2',
          name: courses[1].name,
          resourseUrls: courses[1].resourseUrls,
          testUrls: courses[1].testUrls,
          imageUrl: courses[1].imageUrl,
          credit: courses[1].credit,
          description: courses[1].description,
          createdAt: Date.prototype,
          updatedAt: Date.prototype,
        },
      );

      const mockUserCourse: any = [
        {
          _count: { courseId: 7 },
          courseId: '1',
        },
        {
          _count: { courseId: 6 },
          courseId: '2',
        },
      ];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      jest
        .spyOn(prismaService.userCourse, 'groupBy')
        .mockResolvedValueOnce(mockUserCourse);

      jest
        .spyOn(prismaService.course, 'findMany')
        .mockResolvedValueOnce(mockResponse);

      const course = await service.getPopularCourse();

      expect(prismaService.userCourse.groupBy).toBeCalledTimes(1);
      expect(course).toEqual(mockResponse);
    });

    it('should create a new course if it is not present', async () => {
      const course: CourseDto = {
        name: 'Course1',
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl1'],
        imageUrl: 'image1',
        credit: 10,
        tags: [1, 2],
        description: 'description',
      };
      const responseCourse: Course = {
        id: '7e67a826-636f-4fa7-a7a8-f1d57573f95f',
        name: 'Course1',
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl1'],
        imageUrl: 'image1',
        credit: 10,
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      jest.spyOn(prismaService.course, 'findFirst').mockResolvedValue(null);
      jest
        .spyOn(prismaService.course, 'create')
        .mockResolvedValueOnce(responseCourse);

      jest.spyOn(prismaService.courseTag, 'createMany').mockResolvedValue(null);
      const result = await service.createCourse(course);
      expect(prismaService.course.create).toHaveBeenCalledWith({
        data: {
          name: course.name,
          resourseUrls: course.resourseUrls,
          testUrls: course.testUrls,
          imageUrl: course.imageUrl,
          credit: course.credit,
          description: course.description,
        },
      });
      expect(prismaService.course.create).toHaveBeenCalledTimes(1);
      expect(prismaService.courseTag.createMany).toHaveBeenCalledTimes(2);
      expect(result).toEqual(responseCourse);
    });

    it('should throw BadRequestExecption if course is already present', async () => {
      const course: CourseDto = {
        name: 'Course1',
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl1'],
        imageUrl: 'image1',
        credit: 10,
        description: 'description',
      };
      const responseCourse: Course = {
        id: '7e67a826-636f-4fa7-a7a8-f1d57573f95f',
        name: 'Course1',
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl1'],
        imageUrl: 'image1',
        credit: 10,
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValue(responseCourse);
      const response = new BadRequestException('Course already present');
      jest.spyOn(prismaService.course, 'create').mockRejectedValue(response);
      await expect(service.createCourse(course)).rejects.toThrow(
        new BadRequestException('Course already present'),
      );
    });

    it('should update course', async () => {
      const course: updateCourseDto = {
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl2'],
        imageUrl: 'image1',
        credit: 10,
        tags: [1, 2],
        description: 'description',
        name: '',
      };
      const responseCourse = {
        id: '1',
        name: 'Course1',
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl2'],
        imageUrl: 'image1',
        credit: 10,
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValueOnce(responseCourse);
      jest
        .spyOn(prismaService.course, 'update')
        .mockResolvedValueOnce(responseCourse);
      jest
        .spyOn(prismaService.courseTag, 'deleteMany')
        .mockResolvedValueOnce(null);
      jest
        .spyOn(prismaService.courseTag, 'createMany')
        .mockResolvedValueOnce(null);
      const result = await service.updateCourse('1', course);
      expect(prismaService.course.update).toBeCalledTimes(1);
      expect(prismaService.courseTag.deleteMany).toBeCalledTimes(1);
      expect(prismaService.courseTag.createMany).toBeCalledTimes(1);

      expect(result).toEqual(responseCourse);
    });

    it('should throw NotFoundException if the course is not found in the update', async () => {
      const course: updateCourseDto = {
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl2'],
        imageUrl: 'image1',
        credit: 10,
        description: 'description',
        name: '',
      };

      jest.spyOn(prismaService.course, 'findFirst').mockResolvedValueOnce(null);

      await expect(service.updateCourse('1', course)).rejects.toThrow(
        new NotFoundException('Course does not exists'),
      );
      expect(prismaService.course.update).not.toBeCalled();
    });

    it('should delete course if it is present', async () => {
      const responseCourse: Course = {
        id: '1',
        name: 'Course1',
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl2'],
        imageUrl: 'image1',
        credit: 10,
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const response = 'Course deleted Successfully';
      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValue(responseCourse);
      jest
        .spyOn(prismaService.course, 'delete')
        .mockResolvedValue(responseCourse);
      const result = await service.deleteCourse('1');
      expect(prismaService.course.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(response);
    });

    it('should throw NotFoundException if the course is not found in the delete', async () => {
      const response: Course = null;

      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValueOnce(response);

      await expect(service.deleteCourse('1')).rejects.toThrow(
        new NotFoundException('Course does not exists'),
      );
      expect(prismaService.course.delete).not.toBeCalled();
    });

    it('should throw badRequest if prisma delete course method returns null ', async () => {
      const responseCourse: Course = {
        id: '1',
        name: 'Course1',
        resourseUrls: ['resourceUrl1'],
        testUrls: ['testurl2'],
        imageUrl: 'image1',
        credit: 10,
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };

      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValueOnce(responseCourse);

      jest.spyOn(prismaService.course, 'delete').mockResolvedValueOnce(null);

      await expect(service.deleteCourse('1')).rejects.toThrow(
        new BadRequestException('Some problem occured'),
      );
    });
  });
});
