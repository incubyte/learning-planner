import { CourseController } from '@Course/course.controller';
import { CourseService } from '@Course/course.service';
import { CourseDto } from '@Course/dto/course.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { Course } from '@prisma/client';
import { mock } from 'jest-mock-extended';
import { updateCourseDto } from './dto/updateCourse.dto';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: mock<CourseService>(),
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return course', async () => {
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
        tags: [1],
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
        tags: [1],
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
        tags: courses[0].tags,
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
        tags: courses[1].tags,
        description: courses[1].description,
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      },
    );
    jest.spyOn(service, 'getAll').mockResolvedValueOnce(mockResponse);
    const result = await controller.getAll();
    expect(service.getAll).toBeCalledTimes(1);
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
      tags: [1],
      description: 'description',
    };
    const mockResponse: Course = {
      id: '1',
      name: courses.name,
      resourseUrls: courses.resourseUrls,
      testUrls: courses.testUrls,
      imageUrl: courses.imageUrl,
      credit: courses.credit,
      tags: courses.tags,
      description: courses.description,
      createdAt: Date.prototype,
      updatedAt: Date.prototype,
    };
    jest.spyOn(service, 'getById').mockResolvedValueOnce(mockResponse);
    const result = await controller.getById('1');
    expect(service.getById).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should filter course by tags which is provided', async () => {
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
        tags: [1],
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
        tags: [1, 2],
        description: 'description',
      },
    ];
    const mockResponse = [];
    mockResponse.push({
      id: '2',
      name: courses[1].name,
      resourseUrls: courses[1].resourseUrls,
      testUrls: courses[1].testUrls,
      imageUrl: courses[1].imageUrl,
      credit: courses[1].credit,
      tags: courses[1].tags,
      description: courses[1].description,
      createdAt: Date.prototype,
      updatedAt: Date.prototype,
    });
    const tags = [];
    tags.push('clean-code', 'refactoring');
    jest.spyOn(service, 'filterByTags').mockResolvedValueOnce(mockResponse);
    const result = await controller.filterByTags(tags);
    expect(service.filterByTags).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should return the popular course', async () => {
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
        tags: [1],
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
        tags: [1],
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
        tags: courses[0].tags,
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
        tags: courses[1].tags,
        description: courses[1].description,
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      },
    );
    jest.spyOn(service, 'getPopularCourse').mockResolvedValueOnce(mockResponse);
    const result = await controller.getPopularCourse();
    expect(service.getPopularCourse).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should create course', async () => {
    const course: CourseDto = {
      name: 'Course1',
      resourseUrls: ['resourceUrl1'],
      testUrls: ['testurl1'],
      imageUrl: 'image1',
      credit: 10,
      description: 'description',
      tags: [1, 3],
    };
    const responseCourse: Course = {
      id: '7e67a826-636f-4fa7-a7a8-f1d57573f95f',
      name: 'Course1',
      resourseUrls: ['resourceUrl1'],
      testUrls: ['testurl1'],
      imageUrl: 'image1',
      credit: 10,
      tags: [1, 3],
      description: 'description',
      createdAt: Date.prototype,
      updatedAt: Date.prototype,
    };

    jest.spyOn(service, 'createCourse').mockResolvedValue(responseCourse);
    const result = await controller.createCourse(course);
    expect(service.createCourse).toHaveBeenCalledWith(course);
    expect(service.createCourse).toHaveBeenCalledTimes(1);
    expect(result).toEqual(responseCourse);
  });

  it('should update user', async () => {
    const course: updateCourseDto = {
      resourseUrls: ['resourceUrl1'],
      testUrls: ['testurl2'],
      imageUrl: 'image1',
      credit: 10,
      description: 'description',
      tags: [2],
    };
    const responseCourse: Course = {
      id: '1',
      name: 'Course1',
      resourseUrls: ['resourceUrl1'],
      testUrls: ['testurl2'],
      imageUrl: 'image1',
      credit: 10,
      tags: [2],
      description: 'description',
      createdAt: Date.prototype,
      updatedAt: Date.prototype,
    };

    jest.spyOn(service, 'updateCourse').mockResolvedValueOnce(responseCourse);
    const result = await controller.updateCoures('1', course);
    expect(service.updateCourse).toHaveBeenCalledWith('1', course);
    expect(service.updateCourse).toHaveBeenCalledTimes(1);
    expect(result).toEqual(responseCourse);
  });

  it('should delete course', async () => {
    const response = 'Course is deleted Successfully';
    jest.spyOn(service, 'deleteCourse').mockResolvedValueOnce(response);
    const result = await controller.deleteCourse('1');
    expect(service.deleteCourse).toHaveBeenCalledWith('1');
    expect(service.deleteCourse).toHaveBeenCalledTimes(1);
    expect(result).toEqual('Course is deleted Successfully');
  });
});
