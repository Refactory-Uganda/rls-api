/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './courses.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseStatus } from '@prisma/client';

const mockPrismaService = {
    // Add mock implementations of PrismaService methods if needed
};

describe('CoursesService', () => {
    let service: CourseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CourseService, { provide: PrismaService, useValue: mockPrismaService }],
        }).compile();

        service = module.get<CourseService>(CourseService);
    });

    it('should update course and lessons correctly', async () => {
        const updateDto = {
            Title: 'Updated Course Title',
            Description: 'Updated Description',
            Duration: '30',
            status: CourseStatus.PUBLISHED,
            topics: [
                {
                    id: '671a5e72fd0249d6ee20457b',
                    Title: 'Updated Topic',
                    Description: 'Updated Description',
                    lessons: [
                        {
                            id: '671ac15dd55efdbcbd524024',
                            title: 'Updated Lesson',
                            text: 'Updated Lesson Text',
                        },
                    ],
                },
            ],
        };

        const result = await service.update('671a5e6efd0249d6ee204579', updateDto);
        expect(result).toBeDefined();
        expect(result.Title).toEqual('Updated Course Title');
        expect(result.topics[0].Lesson[0].title).toEqual('Updated Lesson');
    });
});


