// src/text-content/text-content.service.spec.ts
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TextContentService } from './textcontent.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { UpdateTextContentDto } from './dto/update-textcontent.dto';

describe('TextContentService', () => {
  let service: TextContentService;
  let prismaService: PrismaService;

  const mockTextContentData = {
    id: 'some-id',
    heading: 'Sample Heading',
    lessonId: 'lesson-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    textContent: {
      create: jest.fn().mockResolvedValue(mockTextContentData),
      update: jest.fn().mockResolvedValue(mockTextContentData),
      delete: jest.fn().mockResolvedValue(mockTextContentData),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TextContentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TextContentService>(TextContentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNew', () => {
    it('should create a new text content', async () => {
      const createTextContentDto: CreateTextContentDto = {
        heading: 'Sample Heading',
        lessonId: 'lesson-id',
      };

      const result = await service.createNew(createTextContentDto);

      expect(prismaService.textContent.create).toHaveBeenCalledWith({
        data: createTextContentDto,
      });
      expect(result).toEqual(mockTextContentData);
    });
  });

  describe('updateTextContent', () => {
    it('should update text content', async () => {
      const updateTextContentDto: UpdateTextContentDto = {
        heading: 'Updated Heading',
        lessonId: 'new-lesson-id',
      };
      const id = 'some-id';

      const result = await service.updateTextContent(id, updateTextContentDto);

      expect(prismaService.textContent.update).toHaveBeenCalledWith({
        where: { id },
        data: updateTextContentDto,
      });
      expect(result).toEqual(mockTextContentData);
    });
    it('should throw an error if update fails', async () => {
      jest.spyOn(prismaService.textContent, 'update').mockRejectedValue(new Error('Update error'));
      const id = 'some-id';
      const updateTextContentDto: UpdateTextContentDto = {
        heading: 'Updated Heading',
      };

      await expect(service.updateTextContent(id, updateTextContentDto)).rejects.toThrow(
        `Error updating textcontent with ID ${id}: Update error`,
      );
    });
  });

  describe('patchTextContent', () => {
    it('should partially update text content', async () => {
      const partialUpdateDto: Partial<UpdateTextContentDto> = {
        heading: 'Partially Updated Heading',
      };
      const id = 'some-id';

      const result = await service.patchTextContent(id, partialUpdateDto);

      expect(prismaService.textContent.update).toHaveBeenCalledWith({
        where: { id },
        data: partialUpdateDto,
      });
      expect(result).toEqual(mockTextContentData);
    });
    it('should throw an error if patch fails', async () => {
      jest.spyOn(prismaService.textContent, 'update').mockRejectedValue(new Error('Patch error'));
      const id = 'some-id';
      const partialUpdateDto: Partial<UpdateTextContentDto> = {
        heading: 'Partially Updated Heading',
      };

      await expect(service.patchTextContent(id, partialUpdateDto)).rejects.toThrow(
        `Error partially updating textcontent with ID ${id}: Patch error`,
      );
    });
  });

  describe('delete', () => {
    it('should delete a text content', async () => {
      const id = 'some-id';

      const result = await service.delete(id);

      expect(prismaService.textContent.delete).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockTextContentData);
    });
  });
});
