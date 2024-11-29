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
exports.NoteController = void 0;
const common_1 = require("@nestjs/common");
const textnotes_service_1 = require("./textnotes.service");
const create_note_dto_1 = require("./dto/create-note.dto");
const swagger_1 = require("@nestjs/swagger");
const update_textnotes_dto_1 = require("./dto/update-textnotes.dto");
let NoteController = class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
    create(createNoteDto) {
        return this.noteService.create(createNoteDto);
    }
    async update(textnotes_id, updateTextnotesDto) {
        return this.noteService.updateTextnotes(textnotes_id, updateTextnotesDto);
    }
    async patch(textnotes_id, partialUpdateDto) {
        return this.noteService.patchTextnotes(textnotes_id, partialUpdateDto);
    }
    remove(id) {
        return this.noteService.remove(id);
    }
};
exports.NoteController = NoteController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'create notes' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':textnotes_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update Textnotes' }),
    __param(0, (0, common_1.Param)('textnotes_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_textnotes_dto_1.UpdateTextnotesDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':textnotes_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially Update Textnotes' }),
    (0, swagger_1.ApiBody)({ type: update_textnotes_dto_1.UpdateTextnotesDto }),
    __param(0, (0, common_1.Param)('textnotes_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'delete a particular note' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "remove", null);
exports.NoteController = NoteController = __decorate([
    (0, common_1.Controller)('notes'),
    (0, swagger_1.ApiTags)('Notes'),
    __metadata("design:paramtypes", [textnotes_service_1.NoteService])
], NoteController);
//# sourceMappingURL=textnotes.controller.js.map