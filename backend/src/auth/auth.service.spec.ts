import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useFactory() {
            return {
              user: {
                create: jest.fn(),
                delete: jest.fn(),
                findFirst: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Signup', () => {
    afterAll(async () => {
      prismaService.user.delete({
        where: {
          email: 'john@incubyte.co',
        },
      });
    });
    const userDTO: UserDto = {
      email: 'john@incubyte.co',
      password: '1234',
    };
    it('should be signup a User', async () => {
      const prismaUser = null;

      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockReturnValueOnce(prismaUser);

      jest.spyOn(prismaService.user, 'create').mockResolvedValue({
        email: userDTO.email,
        password: userDTO.password,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      });
      const result = await service.signup(userDTO);
      expect(prismaService.user.create).toBeCalledTimes(1);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: userDTO.email,
          password: userDTO.password,
          profilePhoto: 'https://profilephoto.com',
        },
      });
      expect(result).toMatchObject({
        email: userDTO.email,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      });
    });

    it('should return error message if email already exists ', async () => {
      const userDTO: UserDto = {
        email: 'john@incubyte.co',
        password: '1234',
      };

      const prismaUser = {
        email: userDTO.email,
        password: userDTO.password,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      };

      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce(prismaUser);

      await expect(service.signup(userDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
