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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NoteService = class NoteService {
    update(id, updateNoteDto) {
        throw new Error('Method not implemented.');
    }
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNoteDto) {
        const { notesText, textContentId } = createNoteDto;
        const note = await this.prisma.note.create({
            data: {
                notesText,
                textContentId,
            },
        });
        return note;
    }
    async updateTextnotes(id, updateTextnotesDto) {
        try {
            const updateData = {
                notesText: updateTextnotesDto.notesText,
                textContentId: updateTextnotesDto.textContentId,
            };
            return await this.prisma.note.update({
                where: { id },
                data: updateData,
            });
        }
        catch (error) {
            throw new Error(`Error updating textnotes with ID ${id}: ${error.message}`);
        }
    }
    async patchTextnotes(id, partialUpdateDto) {
        try {
            const partialUpdateData = {
                ...partialUpdateDto,
            };
            return await this.prisma.note.update({
                where: { id },
                data: partialUpdateData,
            });
        }
        catch (error) {
            throw new Error(`Error partially updating textnotes with ID ${id}: ${error.message}`);
        }
    }
    async remove(id) {
        return this.prisma.note.delete({
            where: { id },
        });
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NoteService);
//# sourceMappingURL=textnotes.service.js.map