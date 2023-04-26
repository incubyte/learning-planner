import { UserDto } from '@Auth/dto/user.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { UserService } from '@User/user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useFactory() {
            return {
              user: {
                findFirst: jest.fn(),
                update: jest.fn(),
              },
              userCourse: {
                findMany: jest.fn(),
              },
              course: {
                findFirst: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
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

      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValue(mockResponse);
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
      const mockCourseResponse = [prismaCourse1, prismaCourse2, prismaCourse3];

      jest
        .spyOn(prismaService.userCourse, 'findMany')
        .mockResolvedValue(mockUserCourseResponse);

      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValueOnce(prismaCourse1)
        .mockResolvedValueOnce(prismaCourse2)
        .mockResolvedValueOnce(prismaCourse3);

      const courses = await service.getCourseByUserId(prismaUserId, '');
      expect(prismaService.userCourse.findMany).toHaveBeenCalledWith({
        where: { userId: prismaUserId },
      });
      expect(prismaService.course.findFirst).toHaveBeenNthCalledWith(1, {
        where: { id: prismaCourse1Id },
      });
      expect(prismaService.course.findFirst).toHaveBeenNthCalledWith(2, {
        where: { id: prismaCourse2Id },
      });
      expect(prismaService.course.findFirst).toHaveBeenNthCalledWith(3, {
        where: { id: prismaCourse3Id },
      });
      expect(courses).toEqual(mockCourseResponse);
    });

    it('should return the completed course of the specific user', async () => {
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
      const mockCourseResponse = [prismaCourse1, prismaCourse2];

      jest
        .spyOn(prismaService.userCourse, 'findMany')
        .mockResolvedValue(mockUserCourseResponse);

      jest
        .spyOn(prismaService.course, 'findFirst')
        .mockResolvedValueOnce(prismaCourse1)
        .mockResolvedValueOnce(prismaCourse2);

      const courses = await service.getCourseByUserId(
        prismaUserId,
        'completed',
      );
      expect(prismaService.userCourse.findMany).toHaveBeenCalledWith({
        where: { userId: prismaUserId },
      });
      expect(prismaService.course.findFirst).toHaveBeenNthCalledWith(1, {
        where: { id: prismaCourse1Id },
      });
      expect(prismaService.course.findFirst).toHaveBeenNthCalledWith(2, {
        where: { id: prismaCourse2Id },
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
      jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue(mockUpdatedUser);
      const result = await service.updateProfile(updateProfileBody, '1');
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(result).toMatchObject(mockUpdatedUser);
    });
  });
});
