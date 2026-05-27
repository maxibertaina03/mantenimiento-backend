import { type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { GetCurrentUserUseCase } from '../application/get-current-user.use-case';
import { UserResponseDto } from './user-response.dto';
export declare class IamController {
    private readonly getCurrentUser;
    constructor(getCurrentUser: GetCurrentUserUseCase);
    me(user: AuthenticatedUser): Promise<UserResponseDto>;
}
