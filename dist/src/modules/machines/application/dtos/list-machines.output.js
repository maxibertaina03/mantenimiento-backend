"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMachinesOutput = exports.MachineListItemDto = void 0;
class MachineListItemDto {
    id;
    code;
    name;
    status;
    usageHours;
    location;
    brand;
}
exports.MachineListItemDto = MachineListItemDto;
class ListMachinesOutput {
    items;
    total;
    page;
    pageSize;
}
exports.ListMachinesOutput = ListMachinesOutput;
//# sourceMappingURL=list-machines.output.js.map