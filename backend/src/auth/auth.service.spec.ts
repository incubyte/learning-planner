import { UserDto } from '@Auth/dto/user.dto';
import { PrismaService } from '@Prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { AuthService } from './auth.service';
import { Role } from './role.enum';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let mailService: MailerService;

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
                update: jest.fn(),
              },
              forgotPassword: {
                create: jest.fn(),
                deleteMany: jest.fn(),
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
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    mailService = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
        projectTeam: 'abc',
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
        firstName:"ABC",
        lastName:"XYZ",
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
        projectTeam: 'abc',
        firstName:"ABC",
        lastName:"XYZ",
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
        projectTeam: 'abc',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
        firstName:"ABC",
        lastName:"XYZ",
      });

      jest
        .spyOn(jwtService, 'sign')
        .mockReturnValueOnce(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
        );

      const accessToken = await service.signin(userDTO);

      expect(jwtService.sign).toBeCalledTimes(1);
      expect(accessToken).toBeDefined();
      expect(accessToken).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
      );
    });
    it('should be able to return sign token for logged in admin', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce({
        email: userDTO.email,
        password: await hash(userDTO.password, await genSalt(10)),
        projectTeam: 'abc',
        id: '83b7e649-1e37-43be-8229-02ab06c9ba9a',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
        firstName:"ABC",
        lastName:"XYZ",
      });

      jest
        .spyOn(jwtService, 'sign')
        .mockReturnValueOnce(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzYjdlNjQ5LTFlMzctNDNiZS04MjI5LTAyYWIwNmM5YmE5YSIsImVtYWlsIjoiam9obkBpbmN1Ynl0ZS5jbyJ9.6P194HePv2AaSgB1jvyb_lM5EOKyMMu0cWkx_p0O2cc',
        );

      const accessToken = await service.signinAdmin(userDTO);

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

    it('should be able to return response', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce({
        email: 'john@incubyte.co',
        password: await hash(userDTO.password, await genSalt(10)),
        id: '83b7e649-1e37-43be-8229-02ab06c9ba9a',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
        projectTeam: 'abc',
        firstName:"ABC",
        lastName:"XYZ",
      });

      const mockResponse = {
        id: 1,
        email: 'john@incubyte.co',
        token: 'abc',
      };
      jest.spyOn(mailService, 'sendMail').mockResolvedValueOnce('');
      jest
        .spyOn(prismaService.forgotPassword, 'create')
        .mockResolvedValueOnce(mockResponse);

      const result = await service.forgotPassword('john@incubyte.co');
      expect(prismaService.user.findFirst).toBeCalledTimes(1);
      expect(mailService.sendMail).toBeCalledTimes(1);
      expect(prismaService.forgotPassword.create).toBeCalledTimes(1);

      expect(result).toEqual('email sent');
    });
    it('should be able to return response( Admin)', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce({
        email: 'john@incubyte.co',
        password: await hash(userDTO.password, await genSalt(10)),
        id: '83b7e649-1e37-43be-8229-02ab06c9ba9a',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        projectTeam: 'abc',
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
        firstName:"ABC",
        lastName:"XYZ",
      });

      const mockResponse = {
        id: 1,
        email: 'john@incubyte.co',
        token: 'abc',
      };
      jest.spyOn(mailService, 'sendMail').mockResolvedValueOnce('');
      jest
        .spyOn(prismaService.forgotPassword, 'create')
        .mockResolvedValueOnce(mockResponse);

      const result = await service.forgotPasswordAdmin('john@incubyte.co');
      expect(prismaService.user.findFirst).toBeCalledTimes(1);
      expect(mailService.sendMail).toBeCalledTimes(1);
      expect(prismaService.forgotPassword.create).toBeCalledTimes(1);

      expect(result).toEqual('email sent');
    });

    it('should be able to reset the password (Admin)', async () => {
      jest
        .spyOn(prismaService.forgotPassword, 'findFirst')
        .mockResolvedValueOnce({
          id: 1,
          email: 'john@incubyte.co',
          token: '1',
        });

      const mockUser: User = {
        email: 'john@incubyte.co',
        password: '123',
        projectTeam: 'abc',
        id: '1',
        createdAt: Date.prototype,
        profilePhoto: 'https://profilephoto.com',
        updatedAt: Date.prototype,
        eId: 'E0001',
        role: 'BQA',
        clientTeam: 'abc',
        roles: Role.Employee,
        firstName:"ABC",
        lastName:"XYZ",
      };

      jest.spyOn(prismaService.user, 'update').mockResolvedValueOnce(mockUser);

      const result = await service.resetPassword('1', '123');
      expect(prismaService.forgotPassword.findFirst).toBeCalledTimes(1);
      expect(prismaService.user.update).toBeCalledTimes(1);
      expect(prismaService.forgotPassword.deleteMany).toBeCalledTimes(1);
      expect(result).toEqual('password changed');
    });

    it('should throw BadRequestException if user not found', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(null);
      await expect(service.signin(userDTO)).rejects.toThrow(
        new BadRequestException('User not found'),
      );
    });
  });
});
