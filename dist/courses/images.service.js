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
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const sharp = require("sharp");
let ImageService = class ImageService {
    constructor() {
        this.uploadsPath = (0, path_1.join)(process.cwd(), 'uploads');
        this.ensureUploadsDirectory();
    }
    async ensureUploadsDirectory() {
        try {
            await fs_1.promises.mkdir(this.uploadsPath, { recursive: true });
        }
        catch (error) {
            console.error('Failed to create uploads directory:', error);
        }
    }
    async saveImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        if (!file.mimetype.includes('image')) {
            throw new common_1.BadRequestException('Only image files are allowed');
        }
        const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;
        const filePath = (0, path_1.join)(this.uploadsPath, filename);
        try {
            await sharp(file.buffer).resize(800, 600, {
                fit: 'inside',
                withoutEnlargement: true
            }).jpeg({ quality: 80 }).toFile(filePath);
            return filename;
        }
        catch (error) {
            console.error('Failed to save image:', error);
            throw new common_1.BadRequestException('Failed to save image');
        }
    }
    async deleteImage(filename) {
        if (!filename)
            return;
        const filePath = (0, path_1.join)(this.uploadsPath, filename);
        try {
            await fs_1.promises.unlink(filePath);
        }
        catch (error) {
            console.error('Failed to delete image:', error);
        }
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ImageService);
//# sourceMappingURL=images.service.js.map