import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserDto } from '@/auth/dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useFactory() {
            return {
              user: {
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
  });
});
