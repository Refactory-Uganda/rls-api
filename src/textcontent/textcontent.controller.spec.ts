// src/text-content/text-content.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TextContentController } from './textcontent.controller';
import { TextContentService } from './textcontent.service';
import { CreateTextContentDto } from './dto/create-text-content.dto';
import { UpdateTextContentDto } from './dto/update-textcontent.dto';

describe('TextContentController', () => {
  let controller: TextContentController;
  let textContentService: TextContentService;

  const mockTextContentData = {
    id: 'some-id',
    heading: 'Sample Heading',
    lessonId: 'lesson-id',
  };

  const mockTextContentService = {
    createNew: jest.fn().mockResolvedValue(mockTextContentData),
    updateTextContent: jest.fn().mockResolvedValue(mockTextContentData),
    patchTextContent: jest.fn().mockResolvedValue(mockTextContentData),
    delete: jest.fn().mockResolvedValue(mockTextContentData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextContentController],
      providers: [{ provide: TextContentService, useValue: mockTextContentService }],
    }).compile();

    controller = module.get<TextContentController>(TextContentController);
    textContentService = module.get<TextContentService>(TextContentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create new text content', async () => {
      const createTextContentDto: CreateTextContentDto = {
        heading: 'Sample Heading',
        lessonId: 'lesson-id',
      };

      const result = await controller.create(createTextContentDto);

      expect(textContentService.createNew).toHaveBeenCalledWith(createTextContentDto);
      expect(result).toEqual(mockTextContentData);
    });
  });

  describe('update', () => {
    it('should update text content', async () => {
      const updateTextContentDto: UpdateTextContentDto = {
        heading: 'Updated Heading',
        lessonId: 'new-lesson-id',
      };
      const id = 'some-id';

      const result = await controller.update(updateTextContentDto, id);

      expect(textContentService.updateTextContent).toHaveBeenCalledWith(id, updateTextContentDto);
      expect(result).toEqual(mockTextContentData);
    });
  });

  describe('patch', () => {
    it('should partially update text content', async () => {
      const id = 'some-id';
      const partialUpdateDto: Partial<UpdateTextContentDto> = {
        heading: 'Partially Updated Heading',
      };

      const result = await controller.patch(id, partialUpdateDto);

      expect(textContentService.patchTextContent).toHaveBeenCalledWith(id, partialUpdateDto);
      expect(result).toEqual(mockTextContentData);
    });
  });

  describe('delete', () => {
    it('should delete text content', async () => {
      const id = 'some-id';

      const result = controller.delete(id);

      expect(textContentService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockTextContentData);
    });
  });
});
