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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const images_service_1 = require("./images.service");
const faculitator_service_1 = require("./faculitator.service");
let CourseController = class CourseController {
    constructor(courseService, imageService, facilitatorService) {
        this.courseService = courseService;
        this.imageService = imageService;
        this.facilitatorService = facilitatorService;
    }
    async uploadImage(file) {
        const filename = await this.imageService.saveImage(file);
        return (filename);
    }
    async getStaffFromRims() {
        await this.facilitatorService.getStaffFromRims();
        return {
            message: 'Facilitators have been fetched and stored successfully.'
        };
    }
    async deleteCourse(id) {
        return await this.courseService.deleteCourse(id);
    }
    async update(id, updateCourseDto, image) {
        if (image) {
            updateCourseDto.image = image.filename;
        }
        return this.courseService.patchCourse(id, updateCourseDto);
    }
    async staffFacilitator() {
        return await this.courseService.staffFacilitator();
    }
    async getStaffById(staffId) {
        return await this.courseService.getStaffById(staffId);
    }
    async findAll() {
        return await this.courseService.findAll();
    }
    async findOne(id) {
        return await this.courseService.findOne(id);
    }
    async createCourseP_D(createCourseDto, image) {
        console.log('Recieved DTO:', createCourseDto);
        console.log('Recieved Image:', image);
        if (image) {
            createCourseDto.image = image.filename;
        }
        return this.courseService.createCourseDraft(createCourseDto);
    }
    async publishCourse(id) {
        return this.courseService.publishCourse(id);
    }
    async draftCourse(id) {
        return this.courseService.draftCourse(id);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)('upload-image'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder().addFileTypeValidator({
        fileType: /(jpg|jpeg|png)$/,
    }).addMaxSizeValidator({
        maxSize: 1024 * 1024 * 5,
    }).build({
        errorHttpStatusCode: 422
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('getstafffromrims'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getStaffFromRims", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Course' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/courses',
            filename: (req, file, callback) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
                callback(null, `${uniqueName}${file.originalname}`);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        }
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Partially update a Course' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                Title: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 100,
                    description: 'Update Title of the course'
                },
                Description: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 1000,
                    description: 'Update Detailed description of the content'
                },
                Duration: {
                    type: 'string',
                    pattern: '^(1[0-2]|[1-9])\week(s)?$',
                    description: 'Update Duration in format: 6 weeks, 12 weeks '
                },
                status: {
                    type: 'string',
                    enum: ['DRAFT', 'PUBLISHED'],
                    default: 'DRAFT',
                    description: 'Update Current status of the content'
                },
                courseOutline: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Update the different outlines of the course'
                },
                facilitator: {
                    type: 'string'
                },
                requirements: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Update what is needed to take this course'
                },
                assessmentMode: {
                    type: 'string'
                },
                award: {
                    type: 'string'
                },
                courseObjective: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Update the targets of the course'
                },
                image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Update Cover image file (supported formats: jpg, png)',
                }
            }
        }
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('staff'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "staffFacilitator", null);
__decorate([
    (0, common_1.Get)('staff/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getStaffById", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Courses' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a Course by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/courses',
            filename: (req, file, callback) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
                callback(null, `${uniqueName}${file.originalname}`);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        }
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Course draft' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['Title'],
            properties: {
                Title: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 100,
                    description: 'Title of the course/lesson'
                },
                Description: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 1000,
                    description: 'Detailed description of the content'
                },
                Duration: {
                    type: 'string',
                    pattern: '^(1[0-2]|[1-9])\week(s)?$',
                    description: 'Duration in format: 6 weeks, 12 weeks '
                },
                status: {
                    type: 'string',
                    enum: ['DRAFT', 'PUBLISHED', 'DELETED'],
                    default: 'DRAFT',
                    description: 'Current status of the content'
                },
                courseOutline: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'write the different outlines of the course'
                },
                facilitator: {
                    type: 'string'
                },
                requirements: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'what is needed to take this course'
                },
                assessmentMode: {
                    type: 'string'
                },
                award: {
                    type: 'string'
                },
                courseObjective: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'write the targets of the course'
                },
                image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Cover image file (supported formats: jpg, png)',
                }
            }
        }
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourseP_D", null);
__decorate([
    (0, common_1.Patch)(':id/publish'),
    (0, swagger_1.ApiOperation)({ summary: 'Publish a Course' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "publishCourse", null);
__decorate([
    (0, common_1.Patch)(`:id/draft`),
    (0, swagger_1.ApiOperation)({ summary: 'Draft a Course' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "draftCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('courses'),
    (0, swagger_1.ApiTags)('Course'),
    __metadata("design:paramtypes", [courses_service_1.CourseService,
        images_service_1.ImageService,
        faculitator_service_1.FacilitatorService])
], CourseController);
//# sourceMappingURL=courses.controller.js.map