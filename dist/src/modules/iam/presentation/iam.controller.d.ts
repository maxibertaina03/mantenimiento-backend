import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { GetCurrentUserUseCase } from '../application/get-current-user.use-case';
import { ListUsersUseCase } from '../application/list-users.use-case';
import { GetUserUseCase } from '../application/get-user.use-case';
import { UpdateUserUseCase } from '../application/update-user.use-case';
import { DeleteUserUseCase } from '../application/delete-user.use-case';
import { UserResponseDto } from './user-response.dto';
import { UpdateUserRequestDto } from './dtos/update-user.request.dto';
export declare class IamController {
    private readonly getCurrentUser;
    private readonly listUsers;
    private readonly getUser;
    private readonly updateUser;
    private readonly deleteUser;
    constructor(getCurrentUser: GetCurrentUserUseCase, listUsers: ListUsersUseCase, getUser: GetUserUseCase, updateUser: UpdateUserUseCase, deleteUser: DeleteUserUseCase);
    me(user: AuthenticatedUser): Promise<UserResponseDto>;
    list(skip?: number, take?: number): Promise<{
        items: {
            id: string;
            username: string | null;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
            fullName: string;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            createdAt: Date;
        }[];
        total: number;
    }>;
    get(id: string): Promise<UserResponseDto>;
    update(id: string, dto: UpdateUserRequestDto): Promise<UserResponseDto>;
    delete(id: string): Promise<void>;
}
