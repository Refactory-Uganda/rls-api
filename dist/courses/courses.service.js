"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const path_1 = require("path");
const images_service_1 = require("./images.service");
let CourseService = class CourseService {
    transformToArray(value) {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === 'string') {
            if (value.startsWith('[') && value.endsWith(']')) {
                try {
                    return JSON.parse(value);
                }
                catch (error) {
                    console.error('Error parsing JSON string:', error);
                    return value.split(',').map((item) => item.trim());
                }
            }
            return value
                .split(',')
                .map((item) => item.trim())
                .filter((item) => item.length > 0);
        }
        return [];
    }
    constructor(prisma, imageService) {
        this.prisma = prisma;
        this.imageService = imageService;
    }
    async createCourseDraft(dto) {
        try {
            const staffFacilitator = await this.prisma.user.findMany({
                where: {
                    userGroup: 'Staff',
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            });
            if (dto.facilitator &&
                !staffFacilitator.some((user) => user.id === dto.facilitator)) {
                throw new common_1.BadRequestException('Invalid facilitator ID');
            }
            const hasTopics = dto.topics && dto.topics.length > 0;
            const status = hasTopics ? (dto.status ?? `DRAFT`) : `DRAFT`;
            if (hasTopics) {
                dto.topics.forEach((topic, index) => {
                    if (!topic.Title || typeof topic.Description !== 'string') {
                        throw new Error(`Invalid topic at index ${index}: "name" is required and should be a string.`);
                    }
                });
            }
            if (!dto.Title || dto.Title.trim() === '') {
                throw new common_1.BadRequestException('Course title is required');
            }
            console.log('creating course data:', JSON.stringify(dto, null, 2));
            let imageUrl = null;
            if (dto.image) {
                const imagePath = (0, path_1.join)(process.cwd(), 'uploads/courses', dto.image);
                try {
                    await fs_1.promises.access(imagePath);
                    imageUrl = `/uploads/courses/${dto.image}`;
                }
                catch (error) {
                    console.log('Error accessing image path:', error);
                    throw new common_1.BadRequestException('Invalid image file');
                }
            }
            const courseOutline = this.transformToArray(dto.courseOutline);
            const courseObjective = this.transformToArray(dto.courseObjective);
            const requirements = this.transformToArray(dto.requirements);
            if (!Array.isArray(courseOutline)) {
                console.log('courseOutline:', courseOutline);
                throw new common_1.BadRequestException('courseOutline must be an array');
            }
            if (!Array.isArray(requirements)) {
                console.log('requirements:', requirements);
                throw new common_1.BadRequestException('requirements must be an array');
            }
            if (!Array.isArray(courseObjective)) {
                console.log('courseObjective:', courseObjective);
                throw new common_1.BadRequestException('courseObjective must be an array');
            }
            const createData = {
                Title: dto.Title,
                Description: dto.Description,
                Duration: dto.Duration,
                status,
                courseOutline,
                requirements,
                assessmentMode: dto.assessmentMode,
                award: dto.award,
                courseObjective,
                image: imageUrl,
                topics: { create: dto.topics },
                quiz: { create: dto.quiz },
            };
            if (dto.facilitator && dto.facilitator.trim() !== '') {
                Object.assign(createData, { facilitatorId: dto.facilitator });
            }
            if (hasTopics) {
                Object.assign(createData, { topics: { create: dto.topics } });
            }
            let facilitatorDetails = null;
            if (dto.facilitator) {
                const facilitator = await this.prisma.user.findUnique({
                    where: { id: dto.facilitator },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                });
                if (facilitator) {
                    facilitatorDetails = {
                        id: facilitator.id,
                        name: `${facilitator.firstName} ${facilitator.lastName}`,
                        email: facilitator.email,
                    };
                }
            }
            const createdCourse = await this.prisma.course.create({
                data: createData,
            });
            return {
                courses: {
                    ...createdCourse,
                    facilitator: facilitatorDetails,
                },
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    switch (error.code) {
                        case 'P2002':
                            throw new Error('Unique constraint violation: A course with this title already exists.');
                        case 'P2003':
                            throw new Error('Foreign key constraint failed.');
                        case 'P2005':
                            throw new Error('Invalid topics Format.');
                        case 'P2016':
                            throw new Error('Input the correct datatype');
                        case 'P2004':
                            throw new Error('Fill the non nullable fields');
                        case 'P2008':
                            throw new Error('Please connect to a database');
                        case 'P2012':
                            throw new Error('A required value is missing');
                        default:
                            throw new Error(`Database error: ${error.message}`);
                    }
                }
            }
            if (dto.image) {
                try {
                    await this.imageService.deleteImage(dto.image);
                }
                catch (cleanupError) {
                    console.error('Error Cleaning up Image:', cleanupError);
                }
            }
            throw error;
        }
    }
    async publishCourse(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: { topics: true },
        });
        if (!course.topics || course.topics.length === 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Cannot publish a course without topics',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.prisma.course.update({
            where: { id },
            data: {
                status: `PUBLISHED`,
            },
        });
    }
    async draftCourse(id) {
        return await this.prisma.course.update({
            where: { id },
            data: {
                status: `DRAFT`,
            },
        });
    }
    async patchCourse(id, partialUpdateDto) {
        try {
            const updateData = {};
            if ('Title' in partialUpdateDto) {
                updateData.Title = partialUpdateDto.Title;
            }
            if ('Description' in partialUpdateDto) {
                updateData.Description = partialUpdateDto.Description;
            }
            if ('Duration' in partialUpdateDto) {
                updateData.Duration = partialUpdateDto.Duration;
            }
            if ('status' in partialUpdateDto) {
                updateData.status = partialUpdateDto.status;
            }
            if ('award' in partialUpdateDto) {
                updateData.award = partialUpdateDto.award;
            }
            if ('assessmentMode' in partialUpdateDto) {
                updateData.assessmentMode = partialUpdateDto.assessmentMode;
            }
            if ('courseOutline' in partialUpdateDto) {
                const outline = partialUpdateDto.courseOutline;
                updateData.courseOutline = Array.isArray(outline)
                    ? outline
                    : outline.split(',').map((item) => item.trim());
            }
            if ('requirements' in partialUpdateDto) {
                const reqs = partialUpdateDto.requirements;
                updateData.requirements = Array.isArray(reqs)
                    ? reqs
                    : reqs.split(',').map((item) => item.trim());
            }
            if ('courseObjective' in partialUpdateDto) {
                const objectives = partialUpdateDto.courseObjective;
                updateData.courseObjective = Array.isArray(objectives)
                    ? objectives
                    : objectives.split(',').map((item) => item.trim());
            }
            if ('facilitator' in partialUpdateDto) {
                if (partialUpdateDto.facilitator &&
                    partialUpdateDto.facilitator.trim() !== '') {
                    const staffFacilitator = await this.prisma.user.findMany({
                        where: {
                            userGroup: 'Staff',
                        },
                        select: {
                            id: true,
                        },
                    });
                    if (!staffFacilitator.some((user) => user.id === partialUpdateDto.facilitator)) {
                        throw new common_1.BadRequestException('Invalid facilitator ID');
                    }
                    updateData.facilitatorId = partialUpdateDto.facilitator;
                }
                else {
                    updateData.facilitatorId = null;
                }
            }
            if ('image' in partialUpdateDto && partialUpdateDto.image) {
                const filename = partialUpdateDto.image;
                const timestamp = Date.now();
                const uniqueFilename = `${timestamp}-${Math.floor(Math.random() * 1000000000)}${filename}`;
                updateData.image = `/uploads/courses/${uniqueFilename}`;
            }
            const existingCourse = await this.prisma.course.findUnique({
                where: { id },
            });
            if (!existingCourse) {
                throw new common_1.NotFoundException(`Course with ID ${id} not found`);
            }
            const updatedCourse = await this.prisma.course.update({
                where: { id },
                data: updateData,
                include: {
                    topics: true,
                    quiz: true,
                },
            });
            return updatedCourse;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'Failed to partially update course',
                error: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            const courses = await this.prisma.course.findMany({
                include: {
                    topics: {
                        include: {
                            Lesson: {
                                include: {
                                    quiz: {
                                        include: {
                                            questions: {
                                                include: {
                                                    option: true,
                                                    userAnswers: true,
                                                },
                                            },
                                            attempts: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    quiz: {
                        include: {
                            questions: {
                                include: {
                                    option: true,
                                    userAnswers: true,
                                },
                            },
                            attempts: true,
                        },
                    },
                },
            });
            return { courses };
        }
        catch (error) {
            throw new Error(`Error fetching courses: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.course.findUnique({
                where: { id },
                include: {
                    topics: {
                        include: {
                            Lesson: {
                                include: {
                                    quiz: {
                                        include: {
                                            questions: {
                                                include: {
                                                    option: true,
                                                    userAnswers: true,
                                                },
                                            },
                                            attempts: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    quiz: {
                        include: {
                            questions: {
                                include: {
                                    option: true,
                                    userAnswers: true,
                                },
                            },
                            attempts: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw new Error(`Error fetching course with ID ${id}: ${error.message}`);
        }
    }
    async deleteCourse(id) {
        try {
            return await this.prisma.course.delete({
                where: { id: id },
            });
        }
        catch (error) {
            throw new Error(`Error deleting course with ID ${id}: ${error.message}`);
        }
    }
    async staffFacilitator() {
        const staff = await this.prisma.user.findMany({
            where: {
                userGroup: 'Staff',
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
        });
        return staff;
    }
    async getStaffById(staffId) {
        const cleanedStaffId = staffId.replace(/['" ]/g, '');
        const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(cleanedStaffId);
        if (!isValidObjectId) {
            throw new common_1.BadRequestException('Invalid staff ID format');
        }
        try {
            return await this.prisma.user.findUnique({
                where: { id: cleanedStaffId },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    Course: {
                        select: {
                            Title: true,
                            Description: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Error finding staff by ID: ${error.message}`,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        images_service_1.ImageService])
], CourseService);
//# sourceMappingURL=courses.service.js.map