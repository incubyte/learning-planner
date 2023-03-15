import { Post } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { time } from 'console';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { UserDto } from './Dto/userDto';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService:PrismaService;

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
                delete: jest.fn()
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService= module.get<PrismaService>(PrismaService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();

  });

  it('should be signup a User', async () => {
      const userDTO: UserDto = {
        email: 'john@incubyte.co',
        password: '123',
      };
      jest.spyOn(prismaService.user, 'create').mockResolvedValue({
        ...userDTO,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      });  
      const result = await service.signup(userDTO);
      expect(prismaService.user.create).toBeCalledTimes(1);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...userDTO,
          profilePhoto: 'https://profilephoto.com',
        },
      });
      expect(result).toMatchObject({
        ...userDTO,
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
      });
      prismaService.user.delete({
        where: {
          email: 'john@incubyte.co',
        },
      });
    });
});
