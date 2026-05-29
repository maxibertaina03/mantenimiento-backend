"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersOutput = exports.UserListItemDto = void 0;
class UserListItemDto {
    id;
    username;
    email;
    firstName;
    lastName;
    fullName;
    role;
    status;
    createdAt;
}
exports.UserListItemDto = UserListItemDto;
class ListUsersOutput {
    items;
    total;
}
exports.ListUsersOutput = ListUsersOutput;
//# sourceMappingURL=list-users.output.js.map