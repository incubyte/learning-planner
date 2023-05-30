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
                create: jest.fn(),
                update: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
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

  it('should update Tag', async () => {
    const tag: TagDto = {
      name: 'Tag 1',
    };
    const responseTag = {
      id: 1,
      name: 'Tag 1',
    };
    jest
      .spyOn(prismaService.tag, 'findFirst')
      .mockResolvedValueOnce(responseTag);
    jest.spyOn(prismaService.tag, 'update').mockResolvedValueOnce(responseTag);
    const result = await service.updateTag(1, tag);
    expect(prismaService.tag.update).toBeCalledTimes(1);
    expect(result).toEqual(responseTag);
  });

  it('should throw BadRequest Exception if the Tag is not found in update', async () => {
    const tag: TagDto = {
      name: 'Tag 1',
    };
    jest.spyOn(prismaService.tag, 'findFirst').mockResolvedValueOnce(null);
    await expect(service.updateTag(1, tag)).rejects.toThrow(
      new BadRequestException('Tag does not exists'),
    );
    expect(prismaService.tag.update).not.toBeCalled();
  });
});
