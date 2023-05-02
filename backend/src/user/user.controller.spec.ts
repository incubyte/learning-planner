import { UserDto } from '@Auth/dto/user.dto';
import { UpdateUserDto } from '@User/dto/updateUser.dto';
import { UserController } from '@User/user.controller';
import { UserService } from '@User/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mock<UserService>(),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('User Controller', () => {
    const userDTO: UserDto = {
      email: 'john@incubyte.co',
      password: '1234',
    };

    const userDecorator = {
      id: '1',
      email: userDTO.email,
    };

    it('should return the user by specified id', async () => {
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

      jest.spyOn(service, 'getUserById').mockResolvedValue(mockResponse);
      const result = await controller.getUserById(userDecorator);
      expect(service.getUserById).toBeCalledTimes(1);
      expect(result).toMatchObject(mockResponse);
    });

    it('should return the course of the specific user', async () => {
      const mockResponse = {
        courses: [
          {
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
          },
        ],
        count: 2,
      };
      jest.spyOn(service, 'getCourseByUserId').mockResolvedValue(mockResponse);
      const result = await controller.getCourseByUserId(userDecorator, '');
      expect(service.getCourseByUserId).toHaveBeenCalledWith('1', '');
      expect(result).toEqual(mockResponse);
    });

    it('should return the active course of the specific user', async () => {
      const mockResponse = {
        courses: [
          {
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
          },
        ],
        count: 2,
      };
      jest.spyOn(service, 'getCourseByUserId').mockResolvedValue(mockResponse);
      const result = await controller.getCourseByUserId(
        userDecorator,
        'active',
      );
      expect(service.getCourseByUserId).toHaveBeenCalledWith('1', 'active');
      expect(result).toEqual(mockResponse);
    });

    it('should update the user profile', async () => {
      const updateProfileBody: UpdateUserDto = {
        role: 'BQAE',
        clientTeam: 'abcd',
        profilePhoto: 'https://profilephoto.com',
      };

      const mockResponse = {
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

      jest.spyOn(service, 'updateProfile').mockResolvedValue(mockResponse);
      const result = await controller.updateProfile(
        userDecorator,
        updateProfileBody,
      );
      expect(service.updateProfile).toHaveBeenCalledWith(
        updateProfileBody,
        '1',
      );
      expect(result).toEqual(mockResponse);
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
          count: 4,
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
          count: 2,
        },
      ];
      jest.spyOn(service, 'getLeaderboard').mockResolvedValue(mockResponse);
      const result = await controller.getLeaderboard();
      expect(service.getLeaderboard).toHaveBeenCalledWith();
      expect(result).toEqual(mockResponse);
    });
  });
});