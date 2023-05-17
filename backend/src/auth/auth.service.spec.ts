import { UserDto } from '@Auth/dto/user.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { genSalt, hash } from 'bcrypt';
import { AuthService } from './auth.service';
import { Role } from './role.enum';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeAll(async () => {
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
        {
          provide: JwtService,
          useFactory() {
            return {
              sign: jest.fn(),
            };
          },
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    prismaService.user.delete({
      where: {
        email: 'john@incubyte.co',
      },
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Signup', () => {
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
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
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
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
      };

      jest
        .spyOn(prismaService.user, 'findFirst')
        .mockResolvedValueOnce(prismaUser);

      await expect(service.signup(userDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('Signin', () => {
    const userDTO: UserDto = {
      email: 'john@incubyte.co',
      password: '1234',
    };

    it('should be able to return sign token for logged in user', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce({
        email: userDTO.email,
        password: await hash(userDTO.password, await genSalt(10)),
        id: '83b7e649-1e37-43be-8229-02ab06c9ba9a',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
      });

      jest
        .spyOn(jwtService, 'sign')
        .mockReturnValueOnce(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
        );

      const accessToken = await service.signin(userDTO);

      expect(jwtService.sign).toBeCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith({
        email: userDTO.email,
        id: '83b7e649-1e37-43be-8229-02ab06c9ba9a',
        roles: Role.Employee,
      });
      expect(accessToken).toBeDefined();
      expect(accessToken).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
      );
    });

    it('should throw BadRequestException if user not found', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(null);
      await expect(service.signin(userDTO)).rejects.toThrow(
        new BadRequestException('User not found'),
      );
    });

    it('should throw BadRequestException if invalid password', async () => {
      const invalidUserDto: UserDto = {
        email: 'john@incubyte.co',
        password: '123',
      };

      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce({
        email: userDTO.email,
        password: '1234',
        id: '83b7e649-1e37-43be-8229-02ab06c9ba9a',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
      });
      await expect(service.signin(invalidUserDto)).rejects.toThrow(
        new BadRequestException('Invalid password'),
      );
    });
  });
});
