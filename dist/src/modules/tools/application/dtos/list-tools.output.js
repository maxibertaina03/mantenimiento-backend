"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListToolsOutput = exports.ToolListItemDto = void 0;
class ToolListItemDto {
    id;
    code;
    name;
    brand;
    model;
    status;
    location;
    createdAt;
}
exports.ToolListItemDto = ToolListItemDto;
class ListToolsOutput {
    items;
    total;
    page;
    pageSize;
}
exports.ListToolsOutput = ListToolsOutput;
//# sourceMappingURL=list-tools.output.js.map