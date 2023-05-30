import { PrismaService } from '@Prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TagDto } from '@Tag/dto/tag.dto';
import { TagService } from '@Tag/tag.service';
import { BadRequestException } from '@nestjs/common';

describe('TagService', () => {
  let service: TagService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: PrismaService,
          useFactory() {
            return {
              tag: {
                findMany: jest.fn(),
                findFirst: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tags', async () => {
    const tags: TagDto[] = [
      {
        name: 'clean-code',
      },
      {
        name: 'refactoring',
      },
    ];
    const mockResponse = [];
    mockResponse.push(
      {
        id: '1',
        name: tags[0].name,
      },
      {
        id: '2',
        name: tags[1].name,
      },
    );

    jest.spyOn(prismaService.tag, 'findMany').mockResolvedValue(mockResponse);
    const result = await service.getAll();
    expect(prismaService.tag.findMany).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should return course by id which is provided', async () => {
    const tags: TagDto[] = [
      {
        name: 'clean-code',
      },
      {
        name: 'refactoring',
      },
    ];
    const mockResponse: any = [];
    mockResponse.push({
      id: '1',
      name: tags[0].name,
    });
    jest.spyOn(prismaService.tag, 'findFirst').mockResolvedValue(mockResponse);
    const result = await service.getById('1');
    expect(prismaService.tag.findFirst).toBeCalledTimes(1);
    expect(result).toMatchObject(mockResponse);
  });

  it('should create a new tag if it is not present', async () => {
    const tag: TagDto = {
      name: 'Tag',
    };
    const responseTag = {
      id: 1,
      name: 'Tag',
    };
    jest.spyOn(prismaService.tag, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prismaService.tag, 'create').mockResolvedValueOnce(responseTag);
    const result = await service.createTag(tag);
    expect(prismaService.tag.create).toHaveBeenCalledWith({
      data: {
        name: tag.name,
      },
    });
    expect(prismaService.tag.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(responseTag);
  });

  it('should throw BadRequestExecption if tag is already present', async () => {
    const tag: TagDto = {
      name: 'Tag',
    };
    const responseTag = {
      id: 1,
      name: 'Tag',
    };
    jest.spyOn(prismaService.tag, 'findFirst').mockResolvedValue(responseTag);
    const response = new BadRequestException('Tag already exist');
    jest.spyOn(prismaService.tag, 'create').mockRejectedValue(response);
    await expect(service.createTag(tag)).rejects.toThrow(
      new BadRequestException('Tag already exist'),
    );
  });
});
