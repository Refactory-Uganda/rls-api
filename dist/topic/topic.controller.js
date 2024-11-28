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
exports.TopicController = void 0;
const common_1 = require("@nestjs/common");
const topic_service_1 = require("./topic.service");
const swagger_1 = require("@nestjs/swagger");
const create_topic_dto_1 = require("./dto/create-topic.dto");
const update_topic_dto_1 = require("./dto/update-topic.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let TopicController = class TopicController {
    constructor(topicService) {
        this.topicService = topicService;
    }
    async create(course_id, image, body) {
        if (image) {
            body.image = image.filename;
        }
        return this.topicService.create({ ...body, courseId: course_id });
    }
    async patch(id, partialUpdateDto, image) {
        if (image) {
            partialUpdateDto.image = image.filename;
        }
        return this.topicService.patchTopic(id, partialUpdateDto);
    }
    deleteTopic(id) {
        return this.topicService.deleteTopic(id);
    }
    async findAllTopics() {
        return await this.topicService.findAllTopicsByCourse();
    }
    async findOneTopic(id) {
        return await this.topicService.findOneTopic(id);
    }
};
exports.TopicController = TopicController;
__decorate([
    (0, common_1.Post)(':course_id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/topics',
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
    (0, swagger_1.ApiOperation)({ summary: 'Create Topic' }),
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
                    description: 'Title of the Topic'
                },
                Description: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 500,
                    description: 'Add a detailed description of the topic'
                },
                image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Cover image file (supported formats: jpg, png)',
                },
                courseId: {
                    type: 'string',
                    description: 'add a Course ID'
                }
            }
        }
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('course_id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_topic_dto_1.CreateTopicDto]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially Update Topic' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/topics',
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
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                Title: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 100,
                    description: 'Update Title of the Topic'
                },
                Description: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 500,
                    description: 'Update the detailed description of the topic'
                },
                image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Update Cover image file (supported formats: jpg, png)',
                },
                courseId: {
                    type: 'string',
                    description: 'add a Course ID'
                }
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_topic_dto_1.UpdateTopicDto, Object]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Topic' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TopicController.prototype, "deleteTopic", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Topics by courseId' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "findAllTopics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Topic by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopicController.prototype, "findOneTopic", null);
exports.TopicController = TopicController = __decorate([
    (0, common_1.Controller)('topic'),
    (0, swagger_1.ApiTags)('Topic'),
    __metadata("design:paramtypes", [topic_service_1.TopicService])
], TopicController);
//# sourceMappingURL=topic.controller.js.map