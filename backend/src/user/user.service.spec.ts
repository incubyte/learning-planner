import { UserDto } from '@Auth/dto/user.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { UserService } from '@User/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileCourseDto } from './dto/profileCourse.dto';
import { PrismaClient, UserCourse } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let prismaService: DeepMockProxy<PrismaClient>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('User Service', () => {
    const userDTO: UserDto = {
      email: 'john@incubyte.co',
      password: '1234',
    };
    it('should return user of specified id', async () => {
      const mockResponse = {
        email: userDTO.email,
        password: userDTO.password,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      prismaService.user.findFirst.mockResolvedValue(mockResponse);
      const result = await service.getUserById('1');
      expect(prismaService.user.findFirst).toBeCalledTimes(1);
      expect(result).toMatchObject(mockResponse);
    });

    it('should return the course of the specific user', async () => {
      const prismaUserId = '0cecbf92-d381-40b7-b8f8-49ccae3f8263';
      const prismaCourse1Id = '57baa1dd-5bed-4ef6-af67-e588962e3a55';
      const prismaCourse2Id = '7be805c9-906e-485f-86a5-0fc11cfe0e2d';
      const prismaCourse3Id = '1d47941f-d10f-411d-821c-32c3f27ec060';
      const prismaCourse1 = {
        id: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        name: 'Victor - DDD@incubyte - Day1',
        resourseUrls: [
          'https://web.microsoftstream.com/video/7818e2ba-4a60-4d01-9eac-a141bdcd55e8',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [3],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const prismaCourse2 = {
        id: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
        name: 'Day 1 clean code kata',
        resourseUrls: [
          'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [1, 2],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const prismaCourse3 = {
        id: '1d47941f-d10f-411d-821c-32c3f27ec060',
        name: 'Day 4 code design and Insights',
        resourseUrls: [
          'https://web.microsoftstream.com/video/459b7518-45bc-46b6-b9d5-0954f954aa54',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [7, 6],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const mockUserCourseResponse = [
        {
          id: 1,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
          isCompleted: true,
        },
        {
          id: 2,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
          isCompleted: true,
        },
        {
          id: 3,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '1d47941f-d10f-411d-821c-32c3f27ec060',
          isCompleted: true,
        },
      ];
      const mockCourse = [prismaCourse1, prismaCourse2, prismaCourse3];
      const courseIds = [prismaCourse1Id, prismaCourse2Id, prismaCourse3Id];
      const mockCourseResponse: ProfileCourseDto = {
        courses: mockCourse,
        count: 3,
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      prismaService.userCourse.findMany.mockResolvedValue(
        mockUserCourseResponse,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      prismaService.course.findMany.mockResolvedValueOnce(mockCourse);

      const courses = await service.getCourseByUserId(prismaUserId, '');
      expect(prismaService.userCourse.findMany).toHaveBeenCalledWith({
        where: { userId: prismaUserId },
      });
      expect(prismaService.course.findMany).toHaveBeenNthCalledWith(1, {
        where: {
          id: {
            in: courseIds,
          },
        },
      });
      expect(courses).toEqual(mockCourseResponse);
    });

    it('should return the completed course of the specific user', async () => {
      const prismaUserId = '0cecbf92-d381-40b7-b8f8-49ccae3f8263';
      const prismaCourse1Id = '57baa1dd-5bed-4ef6-af67-e588962e3a55';
      const prismaCourse2Id = '7be805c9-906e-485f-86a5-0fc11cfe0e2d';

      const prismaCourse1 = {
        id: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
        name: 'Victor - DDD@incubyte - Day1',
        resourseUrls: [
          'https://web.microsoftstream.com/video/7818e2ba-4a60-4d01-9eac-a141bdcd55e8',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [3],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const prismaCourse2 = {
        id: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
        name: 'Day 1 clean code kata',
        resourseUrls: [
          'https://web.microsoftstream.com/video/21407c23-bd35-471f-ba4a-548ae215539d',
        ],
        testUrls: [''],
        imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
        credit: 10,
        tags: [1, 2],
        description: 'description',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };

      const mockUserCourseResponse = [
        {
          id: 1,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '57baa1dd-5bed-4ef6-af67-e588962e3a55',
          isCompleted: true,
        },
        {
          id: 2,
          userId: '0cecbf92-d381-40b7-b8f8-49ccae3f8263',
          courseId: '7be805c9-906e-485f-86a5-0fc11cfe0e2d',
          isCompleted: true,
        },
      ];
      const mockCourse = [prismaCourse1, prismaCourse2];
      const courseIds = [prismaCourse1Id, prismaCourse2Id];
      const mockCourseResponse: ProfileCourseDto = {
        courses: mockCourse,
        count: 2,
      };

      prismaService.userCourse.findMany.mockResolvedValue(
        mockUserCourseResponse,
      );

      prismaService.course.findMany.mockResolvedValueOnce(mockCourse);

      const courses = await service.getCourseByUserId(
        prismaUserId,
        'completed',
      );
      expect(prismaService.userCourse.findMany).toHaveBeenCalledWith({
        where: { userId: prismaUserId, isCompleted: true },
      });
      expect(prismaService.course.findMany).toHaveBeenNthCalledWith(1, {
        where: {
          id: {
            in: courseIds,
          },
        },
      });
      expect(courses).toEqual(mockCourseResponse);
    });
    it('should return the updated user', async () => {
      const updateProfileBody: UpdateUserDto = {
        role: 'BQAE',
        clientTeam: 'abcd',
        profilePhoto: 'https://profilephoto.com',
      };

      const mockUpdatedUser = {
        email: userDTO.email,
        password: userDTO.password,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQAE',
        clientTeam: 'abcd',
      };
      prismaService.user.update.mockResolvedValue(mockUpdatedUser);
      const result = await service.updateProfile(updateProfileBody, '1');
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(result).toMatchObject(mockUpdatedUser);
    });

    it('should return the top 5 users', async () => {
      const mockResponse = [
        {
          user: {
            id: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
            eId: 'E0088',
            role: 'SC',
            clientTeam: 'Learning Planner',
            email: 'charvit@incubyte.co',
            password:
              '$2b$10$I0vM.YKpDT87ekNAmw8KSe3zdVkQlkpzUZo44.rZ1Od0SeWiqlCJ.',
            profilePhoto: 'https://profilephoto.com',
            createdAt: Date.prototype,
            updatedAt: Date.prototype,
          },
          CompletedCourseCount: 4,
        },
        {
          user: {
            id: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
            eId: 'E0097',
            role: 'SC',
            clientTeam: 'Learning Planner',
            email: 'shreyas@incubyte.co',
            password:
              '$2b$10$K.3VzQM7VVGY6pywSVKywOozqlMfwmMADiF5dXBWWj8Fn.qxG9qQW',
            profilePhoto:
              'https://res.cloudinary.com/dxepcudkt/image/upload/v1682573373/cojqoxpcgax1tkq0zi6a.jpg',
            createdAt: Date.prototype,
            updatedAt: Date.prototype,
          },
          CompletedCourseCount: 2,
        },
      ];

      const mockUser1 = {
        id: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
        eId: 'E0097',
        role: 'SC',
        clientTeam: 'Learning Planner',
        email: 'shreyas@incubyte.co',
        password:
          '$2b$10$K.3VzQM7VVGY6pywSVKywOozqlMfwmMADiF5dXBWWj8Fn.qxG9qQW',
        profilePhoto:
          'https://res.cloudinary.com/dxepcudkt/image/upload/v1682573373/cojqoxpcgax1tkq0zi6a.jpg',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };

      const mockUser2 = {
        id: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
        eId: 'E0088',
        role: 'SC',
        clientTeam: 'Learning Planner',
        email: 'charvit@incubyte.co',
        password:
          '$2b$10$I0vM.YKpDT87ekNAmw8KSe3zdVkQlkpzUZo44.rZ1Od0SeWiqlCJ.',
        profilePhoto: 'https://profilephoto.com',
        createdAt: Date.prototype,
        updatedAt: Date.prototype,
      };
      const mockUsers = [mockUser2, mockUser1];
      const mockUserCourse1 = {
        _count: {
          courseId: 4,
        },
        userId: '36ebe3de-10a6-4aa2-81b1-8f27468d0f10',
      };
      const mockUserCourse2 = {
        _count: {
          courseId: 2,
        },
        userId: '2fbc0f79-a1ea-4d5e-9c02-9bfb4dac50c3',
      };
      const mockUserCourseResponse: any = [mockUserCourse1, mockUserCourse2];
      prismaService.userCourse.groupBy.mockResolvedValueOnce(
        mockUserCourseResponse,
      );

      prismaService.user.findMany.mockResolvedValueOnce(mockUsers);

      const leaderboard = await service.getLeaderboard();

      expect(prismaService.userCourse.groupBy).toBeCalledTimes(1);
      expect(leaderboard).toEqual(mockResponse);
    });

    it('should enroll the course for user', async () => {
      const mockUserCourse: UserCourse = null;
      prismaService.userCourse.findFirst.mockResolvedValue(mockUserCourse);
      const mockCreateUserCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: false,
      };
      prismaService.userCourse.create.mockResolvedValue(mockCreateUserCourse);
      const result = await service.enrollCourse('1', 'course1');
      expect(result).toEqual(mockCreateUserCourse);
      expect(prismaService.userCourse.findFirst).toHaveBeenCalledWith({
        where: {
          userId: '1',
          courseId: 'course1',
        },
      });
      expect(prismaService.userCourse.create).toHaveBeenCalledWith({
        data: {
          userId: '1',
          courseId: 'course1',
          isCompleted: false,
        },
      });
    });

    it('should throw BadRequestException when user is already enrolled in course', async () => {
      const mockUserCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: false,
      };
      prismaService.userCourse.findFirst.mockResolvedValue(mockUserCourse);
      jest.spyOn(service, 'isUserEnrolledInCourse').mockReturnValue(true);
      await expect(service.enrollCourse('1', 'course1')).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaService.userCourse.create).not.toHaveBeenCalled();
    });

    it('should return true when user is enrolled in course', () => {
      const userCourse: UserCourse = {
        id: 1,
        userId: '1',
        courseId: 'course1',
        isCompleted: false,
      };
      expect(service.isUserEnrolledInCourse(userCourse)).toBe(true);
    });

    it('should return false when user is not enrolled in course', () => {
      const userCourse: UserCourse = null;
      expect(service.isUserEnrolledInCourse(userCourse)).toBe(false);
    });
  });
});
