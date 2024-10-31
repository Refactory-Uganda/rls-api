/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './courses.service';
import { PrismaService } from 'src/prisma/prisma.service';

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
            status: 'ACTIVE',
            topics: [
                {
                    id: '671a5e72fd0249d6ee20457b',
                    Title: 'Updated Topic',
                    Description: 'Updated Description',
                    Lesson: [
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
=======
import { PrismaService } from "src/prisma/prisma.service";
import { CourseService } from "./courses.service";
import { Test, TestingModule } from "@nestjs/testing";
import { UpdateCourseDto } from "./dto/update-course.dto";


describe('CourseService', () => {
    let service: CourseService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CourseService,
                {
                    provide: PrismaService,
                    useValue: {
                        course: {
                            update: jest.fn(),
                            findUnique: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<CourseService>(CourseService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    describe('updateCourse', () => {
        it('should update a course with valid topics and lessons', async () => {
            const updateCourseDto: UpdateCourseDto = {
                Title: 'Updated Course',
                Description: 'Updated Description',
                Duration: '10',
                topics: [
                    {
                        id: 'topic1',
                        Title: 'Updated Topic',
                        Description: 'Updated Topic Description',
                        lessons: [
                            {
                                id: 'lesson1',
                                title: 'Updated Lesson',
                                text: 'Updated Lesson Text',
                            },
                        ],
                    },
                ],
            };

            const updatedCourse = {
                id: 'course1',
                Title: 'Updated Course',
                Description: 'Updated Description',
                Duration: '10',
                status: CourseStatus.ACTIVE, // Assuming 'ACTIVE' is a valid CourseStatus
                createdAt: new Date(),
                topics: [
                    {
                        id: 'topic1',
                        Title: 'Updated Topic',
                        Description: 'Updated Topic Description',
                        Lesson: [
                            {
                                id: 'lesson1',
                                title: 'Updated Lesson',
                                text: 'Updated Lesson Text',
                            },
                        ],
                    },
                ],
            };

            jest.spyOn(prisma.course, 'update').mockResolvedValue(updatedCourse);

            const result = await service.updateCourse('course1', updateCourseDto);

            expect(result).toEqual(updatedCourse);
            expect(prisma.course.update).toHaveBeenCalledWith({
                where: { id: 'course1' },
                data: {
                    Title: updateCourseDto.Title,
                    Description: updateCourseDto.Description,
                    Duration: updateCourseDto.Duration,
                    topics: {
                        update: [
                            {
                                where: { id: 'topic1' },
                                data: {
                                    Title: 'Updated Topic',
                                    Description: 'Updated Topic Description',
                                    Lesson: {
                                        upsert: [
                                            {
                                                where: { id: 'lesson1' },
                                                create: {
                                                    title: 'Updated Lesson',
                                                    text: 'Updated Lesson Text',
                                                    topicId: 'topic1',
                                                },
                                                update: {
                                                    title: 'Updated Lesson',
                                                    text: 'Updated Lesson Text',
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                    },
                },
                include: {
                    topics: {
                        include: { Lesson: true },
                    },
                },
            });
        });

        it('should throw an error if topic ID is missing', async () => {
            const updateCourseDto: UpdateCourseDto = {
                Title: 'Updated Course',
                Description: 'Updated Description',
                Duration: '10',
                topics: [
                    {
                        id: undefined,
                        Title: 'Updated Topic',
                        Description: 'Updated Topic Description',
                        lessons: [],
                    },
                ],
            };

            await expect(service.updateCourse('course1', updateCourseDto)).rejects.toThrow(
                'Argument `where` of type TopicWhereUniqueInput needs at least one of `id` or `Title` arguments.'
            );
        });

        it('should update a course with no topics provided', async () => {
            const updateCourseDto: UpdateCourseDto = {
                Title: 'Updated Course',
                Description: 'Updated Description',
                Duration: '10',
                topics: [],
            };

            const updatedCourse = {
                id: 'course1',
                Title: 'Updated Course',
                Description: 'Updated Description',
                Duration: '10',
                topics: [],
            };

            jest.spyOn(prisma.course, 'update').mockResolvedValue(updatedCourse);

            const result = await service.updateCourse('course1', updateCourseDto);

            expect(result).toEqual(updatedCourse);
            expect(prisma.course.update).toHaveBeenCalledWith({
                where: { id: 'course1' },
                data: {
                    Title: updateCourseDto.Title,
                    Description: updateCourseDto.Description,
                    Duration: updateCourseDto.Duration,
                    topics: {
                        update: [],
                    },
                },
                include: {
                    topics: {
                        include: { Lesson: true },
                    },
                },
            });
        });
    });
});
>>>>>>> 79465aca0c4fefcb1d14a7a4dff921d483bf5609
