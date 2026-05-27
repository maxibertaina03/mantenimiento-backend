"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const domain_exception_1 = require("../../../common/exceptions/domain.exception");
class User {
    id;
    clerkUserId;
    _username;
    _email;
    _firstName;
    _lastName;
    _avatarUrl;
    _role;
    _status;
    tenantId;
    createdAt;
    updatedAt;
    constructor(id, clerkUserId, _username, _email, _firstName, _lastName, _avatarUrl, _role, _status, tenantId, createdAt, updatedAt) {
        this.id = id;
        this.clerkUserId = clerkUserId;
        this._username = _username;
        this._email = _email;
        this._firstName = _firstName;
        this._lastName = _lastName;
        this._avatarUrl = _avatarUrl;
        this._role = _role;
        this._status = _status;
        this.tenantId = tenantId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get username() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get avatarUrl() {
        return this._avatarUrl;
    }
    get role() {
        return this._role;
    }
    get status() {
        return this._status;
    }
    get fullName() {
        const fromName = [this._firstName, this._lastName].filter(Boolean).join(' ').trim();
        return fromName || this._username || this._email || 'Usuario';
    }
    changeRole(role) {
        if (this._status !== 'ACTIVE') {
            throw new domain_exception_1.InvariantError('USER_NOT_ACTIVE', 'No se puede cambiar el rol de un usuario inactivo');
        }
        this._role = role;
    }
    deactivate() {
        this._status = 'INACTIVE';
    }
    suspend() {
        this._status = 'SUSPENDED';
    }
    activate() {
        this._status = 'ACTIVE';
    }
    static rehydrate(props) {
        return new User(props.id, props.clerkUserId, props.username, props.email, props.firstName, props.lastName, props.avatarUrl, props.role, props.status, props.tenantId, props.createdAt, props.updatedAt);
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map