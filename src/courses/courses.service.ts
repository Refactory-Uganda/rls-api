/* eslint-disable prettier/prettier */
// src/course/course.service.ts
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
	// update(arg0: string, updateDto: { Title: string; Description: string; Duration: string; status: "PUBLISHED"; topics: { id: string; Title: string; Description: string; lessons: { id: string; title: string; text: string; }[]; }[]; }) {
	//     throw new Error('Method not implemented.');
	// }
	constructor(private prisma: PrismaService) { }

	async createCourseDraft(dto: CreateCourseDto) {
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

			if (dto.facilitator && !staffFacilitator.some((user) => user.id === dto.facilitator)) {
				throw new BadRequestException('Invalid facilitator ID');
			}

			// check for topics
			const hasTopics = dto.topics && dto.topics.length > 0;

			// set to draft if no topics
			const status = hasTopics ? dto.status ?? `DRAFT` : `DRAFT`;

			// Validate each topic to ensure they have the required structure
			if (hasTopics) {
				dto.topics.forEach((topic, index) => {
					if (!topic.Title || typeof topic.Description !== 'string') {
						throw new Error(`Invalid topic at index ${index}: "name" is required and should be a string.`);
					}
					// Add more validation as needed, like checking `description`, etc.
				});
			}

			if (!dto.Title || dto.Title.trim( ) === '') {
				throw new BadRequestException('Course title is required');
			}
			console.log('creatiing course data:', JSON.stringify(dto, null, 2));


			const imageUrl = dto.image ? `/uploads/courses/${dto.image}` : null;

			if (!Array.isArray(dto.courseOutline)) {
				console.log('courseOutline:', dto.courseOutline);
				throw new BadRequestException('courseOutline must be an array');
			}
			
			if (!Array.isArray(dto.requirements)) {
				console.log('requirements:', dto.requirements);
				throw new BadRequestException('requirements must be an array');
			}
			
			if (!Array.isArray(dto.courseObjective)) {
				console.log('courseObjective:', dto.courseObjective);
				throw new BadRequestException('courseObjective must be an array');
			}

			return await this.prisma.course.create({
				data: {
					Title: dto.Title,
					Description: dto.Description,
					Duration: dto.Duration,
					status,
					courseOutline: dto.courseOutline,
					facilitatorId: dto.facilitator,
					requirements: dto.requirements,
					assessmentMode:dto.assessmentMode,
					award: dto.Award,
					courseObjective: dto.courseObjective,
					image: imageUrl,
					topics: {
						create: dto.topics,
					}, 
					
				},
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
			// if (error instanceof) {}
			throw error;
		}
	}

// publish course
	async publishCourse(id: string) {
		// check for topis
		const course = await this.prisma.course.findUnique({
			where: { id },
			include: { topics: true }
		});

		if (!course.topics || course.topics.length === 0) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					message: 'Cannot publish a course without topics',
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		return await this.prisma.course.update({
			where: { id },
			data: {
				status: `PUBLISHED`,
			},
		});
	}

// make a course draft
	async draftCourse(id: string) {
		return await this.prisma.course.update({
			where: { id },
			data: {
				status: `DRAFT`,
			},
		});
	}

	async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
		try {

			const staffFacilitator = await this.prisma.user.findMany({
				where: {
					userGroup: 'Staff',
				},
				select: {
					id: true
				},
			});

			if (updateCourseDto.facilitator && !staffFacilitator.some((user) => user.id === updateCourseDto.facilitator)) {
				throw new BadRequestException('Invalid facilitator ID');
			}

			const imageUrl = updateCourseDto.image ? `/uploads/courses/${updateCourseDto.image}` : null;
			
			return await this.prisma.course.update({
				where: { id },
				data: {
					Title: updateCourseDto.Title,
					Description: updateCourseDto.Description,
					Duration: updateCourseDto.Duration,
					status: updateCourseDto.status,
					facilitatorId: updateCourseDto.facilitator,
					courseOutline: updateCourseDto.courseOutline,
					courseObjective: updateCourseDto.courseObjective,
					requirements: updateCourseDto.requirements,
					award: updateCourseDto.award,
					assessmentMode: updateCourseDto.assessmentMode,
					image: imageUrl,
					topics: {
						update: updateCourseDto.topics?.map((topic) => ({
							where: { id: topic.id },
							data: {
								Title: topic.Title,
								Description: topic.Description,
							},
						})),
					},
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					message: 'Failed to update course',
					error: error.message,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async patchCourse(id: string, partialUpdateDto: Partial<UpdateCourseDto>) {
		try {
			return await this.prisma.course.update({
				where: { id },
				data: {
					Title: partialUpdateDto.Title,
					Description: partialUpdateDto.Description,
					Duration: partialUpdateDto.Duration,
					topics: {
						update: partialUpdateDto.topics?.map((topic) => ({
							where: { id },
							data: {
								Title: topic.Title,
								Description: topic.Description,
							},
						})),
					},
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					message: 'Failed to partially update course',
					error: error.message,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}


	async findAll(
		// page: number = 1, limit: number = 2
	) {
		try {
			// const skip = (page - 1) * limit;
			const courses = await this.prisma.course.findMany({
				// skip,
				// take: Number(limit),
				include: {
					topics: {
						include: { Lesson: true }
					}
				}
			});

			// const totalCourses = await this.prisma.course.count();

			return {
				courses,
				// total: totalCourses,
				// page,
				// limit,
				// totalPages: Math.ceil(totalCourses / limit),
			};
		} catch (error) {
			throw new Error(`Error fetching courses: ${error.message}`);
		}
	}

	// Method to fetch a single course by ID
	async findOne(id: string) {
		try {
			return await this.prisma.course.findUnique({
				where: { id: id },
				include: {
					topics: {
						include: { Lesson: true }
					}
				}

			});
		} catch (error) {
			throw new Error(`Error fetching course with ID ${id}: ${error.message}`);
		}
	}

	async deleteCourse(id: string) {
		try {
			return await this.prisma.course.delete({
				where: { id: id },
			});
		} catch (error) {
			throw new Error(`Error deleting course with ID ${id}: ${error.message}`);
		}
	}
}
