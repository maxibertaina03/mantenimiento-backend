"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMaterialsOutput = exports.MaterialListItemDto = void 0;
class MaterialListItemDto {
    id;
    code;
    name;
    unit;
    stock;
    minStock;
    location;
    createdAt;
}
exports.MaterialListItemDto = MaterialListItemDto;
class ListMaterialsOutput {
    items;
    total;
    page;
    pageSize;
}
exports.ListMaterialsOutput = ListMaterialsOutput;
//# sourceMappingURL=list-materials.output.js.map