// src/sub-heading/sub-heading.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SubHeadingService } from './subheading.service';
import { PrismaService } from '../prisma/prisma.service'; // Update with correct import path
import { CreateSubHeadingDto } from './dto/create-sub-heading.dto';
import { UpdateSubheadingDto } from './dto/update-subheading.dto';

const mockSubHeading = {
  id: 'some_id',
  subText: 'Some subheading text',
  textContentId: 'text_content_id',
};

const mockPrismaService = {
  subHeading: {
    create: jest.fn().mockResolvedValue(mockSubHeading),
    update: jest.fn().mockResolvedValue(mockSubHeading),
    delete: jest.fn().mockResolvedValue(mockSubHeading),
  },
};

describe('SubHeadingService', () => {
  let service: SubHeadingService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubHeadingService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SubHeadingService>(SubHeadingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subheading', async () => {
      const createSubHeadingDto: CreateSubHeadingDto = { subText: 'Some subheading text', textContentId: 'text_content_id' };
      const result = await service.create(createSubHeadingDto);
      expect(result).toEqual(mockSubHeading);
      expect(prisma.subHeading.create).toHaveBeenCalledWith({
        data: createSubHeadingDto,
      });
    });
  });

  describe('updateSubheading', () => {
    it('should update a subheading', async () => {
      const updateSubheadingDto: UpdateSubheadingDto = { subText: 'Updated subheading text', textContentId: 'text_content_id' };
      const result = await service.updateSubheading(mockSubHeading.id, updateSubheadingDto);
      expect(result).toEqual(mockSubHeading);
      expect(prisma.subHeading.update).toHaveBeenCalledWith({
        where: { id: mockSubHeading.id },
        data: updateSubheadingDto,
      });
    });
  });

  describe('patchTextContent', () => {
    it('should partially update a subheading', async () => {
      const partialUpdateDto: Partial<UpdateSubheadingDto> = { subText: 'Partially updated text' };
      const result = await service.patchTextContent(mockSubHeading.id, partialUpdateDto);
      expect(result).toEqual(mockSubHeading);
      expect(prisma.subHeading.update).toHaveBeenCalledWith({
        where: { id: mockSubHeading.id },
        data: partialUpdateDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a subheading', async () => {
      const result = await service.remove(mockSubHeading.id);
      expect(result).toEqual(mockSubHeading);
      expect(prisma.subHeading.delete).toHaveBeenCalledWith({ where: { id: mockSubHeading.id } });
    });
  });
});
