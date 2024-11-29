"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTextContentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_text_content_dto_1 = require("./create-text-content.dto");
class UpdateTextContentDto extends (0, swagger_1.PartialType)(create_text_content_dto_1.CreateTextContentDto) {
}
exports.UpdateTextContentDto = UpdateTextContentDto;
//# sourceMappingURL=update-textcontent.dto.js.map